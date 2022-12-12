function SQLEngine(database) {
  this.execute = function (query) {
    const parts = this.partitionQuery(query.toLowerCase());
    const processedParts = this.reprocessParts(parts);
    const baseTable = this.getFromTable(processedParts);
    const finalDataset = this.processJoins(baseTable, processedParts);
    const filteredDataset = this.processWhere(finalDataset, processedParts);
    return this.processSelect(filteredDataset, processedParts);
  };

  this.partitionQuery = function (query) {
    const keywords = ["select", "from", "join", "where"];

    let parts = {
      select: "",
      from: "",
      join: "",
      where: "",
    };

    const splittedQuery = query.split(" ");
    let currentKeyword = "";
    let currentCompletion = "";

    splittedQuery.forEach((word) => {
      if (keywords.includes(word)) {
        if (currentKeyword) parts[currentKeyword] += currentCompletion.trim();
        currentKeyword = word;
        currentCompletion = word;
      } else {
        currentCompletion += " " + word;
      }
    });

    parts[currentKeyword] += currentCompletion.trim();

    return parts;
  };

  this.reprocessParts = function (parts) {
    let workedParts = {};

    workedParts["select"] = parts["select"]
      .replace("select", "")
      .split(",")
      .map((elem) => elem.trim());
    workedParts["from"] = parts["from"].replace("from", "").trim();
    workedParts["join"] = parts["join"]
      .split("join")
      .filter((elem) => elem.length > 0)
      .map((elem) => elem.trim());
    workedParts["where"] = parts["where"].replace("where", "").trim();

    return workedParts;
  };

  this.getFromTable = function (processedParts) {
    return this.reworkTable(processedParts["from"]);
  };

  this.processJoins = function (baseTable, processedParts) {
    let dataset = baseTable;

    processedParts["join"].forEach((join) => {
      const splittedJoin = join.split("on");
      const table = splittedJoin[0].trim();
      const condition = splittedJoin[1].trim();
      const joinDataset = this.reworkTable(table);
      dataset = this.joinDatasets(dataset, joinDataset, condition);
    });

    return dataset;
  };

  this.reworkTable = function (tableName) {
    const table = database[tableName];
    return table.map((elem) => {
      let register = {};
      Object.keys(elem).forEach((key) => (register[`${tableName}.${key}`] = elem[key]));
      return register;
    });
  };

  this.joinDatasets = function (dataset1, dataset2, condition) {
    const conditionData = this.reworkCondition(condition);
    const splittedCondition = conditionData["conditions"];
    const operator = conditionData["operator"];

    let joinedDataset = [];
    let firstDataset = Object.keys(dataset1[0])
      .map((elem) => elem.toLowerCase())
      .includes(splittedCondition[0])
      ? dataset1
      : dataset2;
    let secondDataset = Object.keys(dataset1[0])
      .map((elem) => elem.toLowerCase())
      .includes(splittedCondition[1])
      ? dataset1
      : dataset2;

    for (let firstDatasetElement of firstDataset) {
      for (let secondDatasetElement of secondDataset) {
        const firstDataKey = Object.keys(firstDatasetElement).find(
          (key) => key.toLowerCase() === splittedCondition[0]
        );
        const firstDatasetField = firstDatasetElement[firstDataKey];
        const secondDataKey = Object.keys(secondDatasetElement).find(
          (key) => key.toLowerCase() === splittedCondition[1]
        );
        const secondDatasetField = secondDatasetElement[secondDataKey];
        const validJoin = eval(firstDatasetField + operator + secondDatasetField);
        if (validJoin) joinedDataset.push({ ...firstDatasetElement, ...secondDatasetElement });
      }
    }

    return joinedDataset;
  };

  this.reworkCondition = function (condition) {
    const operators = ["=", "<>", ">", "<", "<=", ">="];
    const operatorRegex = new RegExp(operators.join("|"));
    const splittedCondition = condition
      .split(operatorRegex)
      .map((condition) => condition.trim())
      .filter((condition) => condition.length > 0);
    let operator = operatorRegex.exec(condition)[0];
    if (operator === "=") operator = "===";
    else if (operator === "<>") operator = "!==";

    return {
      conditions: splittedCondition,
      operator,
    };
  };

  this.processWhere = function (dataset, processedParts) {
    if (processedParts["where"].length === 0) return dataset;

    const processedWhere = this.reworkCondition(processedParts["where"]);
    return dataset.filter((element) => {
      const realKey = Object.keys(element).find(
        (key) => key.toLowerCase() === processedWhere["conditions"][0]
      );
      const toFilterField = this.processDataType(element[realKey]);
      const toFilterCondition = this.processDataType(processedWhere["conditions"][1]);
      return eval(toFilterField + processedWhere["operator"] + toFilterCondition);
    });
  };

  this.processSelect = function (dataset, processedParts) {
    const validKeys = processedParts["select"];

    return dataset.map((element) => {
      let newElement = {};

      for (let key of validKeys) {
        const realKey = Object.keys(element).find((realKey) => realKey.toLowerCase() === key);
        newElement[realKey] = element[realKey];
      }

      return newElement;
    });
  };

  this.processDataType = function (data) {
    if (isNaN(data)) return this.quote(data.toString().toLowerCase());
    return Number(data);
  };

  this.quote = function (element) {
    let processedElement = element;
    if (
      (element.startsWith("'") && element.endsWith("'")) ||
      (element.startsWith('"') && element.endsWith('"'))
    )
      processedElement = processedElement.substring(1, processedElement.length - 1);

    processedElement = processedElement
      .split(/'|"/)
      .filter((elem) => elem.length > 0)
      .join("\\'");
    return "'" + processedElement + "'";
  };
}
