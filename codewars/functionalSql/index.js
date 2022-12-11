function query() {
  let select = null;
  let groupBy = null;
  let orderFn = null;
  let where = [];
  let from = [];
  let having = [];

  const execute = () => {
    let data = [];

    for (let collection of from) {
      if (data.length === 0) {
        data = [...collection];
        continue;
      }

      const newData = [];
      for (let joinedCollection of data) {
        for (let elem of collection) {
          newData.push([joinedCollection, elem]);
        }
      }

      data = newData;
    }

    for (let fns of where) data = data.filter((elem) => fns.some((fn) => fn(elem)));

    if (!!groupBy) {
      const dataStructure = [];
      for (let entry of data) {
        const groups = groupBy.map((group) => group(entry));
        let root = dataStructure;
        for (let group of groups) {
          let newRoot = root.find((elem) => elem?.[0] === group)?.[1];
          if (!newRoot) {
            root.push([group, []]);
            newRoot = root[root.length - 1][1];
          }
          root = newRoot;
        }
        root.push(entry);
      }
      data = dataStructure;
    }

    for (let fns of having) data = data.filter((elem) => fns.some((fn) => fn(elem)));

    if (orderFn) data.sort(orderFn);

    return select ? data.map(select) : data;
  };

  const sqlObject = {
    select: (fields) => {
      if (select !== null) throw new Error("Duplicate SELECT");
      select = fields;
      return sqlObject;
    },
    from: (...collections) => {
      if (from.length !== 0) throw new Error("Duplicate FROM");
      from = collections;
      return sqlObject;
    },
    where: (...fn) => {
      where.push(fn);
      return sqlObject;
    },
    orderBy: (order) => {
      if (orderFn !== null) throw new Error("Duplicate ORDERBY");
      orderFn = order;
      return sqlObject;
    },
    groupBy: (...groups) => {
      if (groupBy !== null) throw new Error("Duplicate GROUPBY");
      groupBy = groups;
      return sqlObject;
    },
    having: (...fn) => {
      having.push(fn);
      return sqlObject;
    },
    execute,
  };

  return sqlObject;
}
