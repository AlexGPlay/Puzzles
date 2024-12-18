/**
 * @param {Array<Object>} data
 * @returns {string}
 */
function drawTable(data) {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

  const headers = Object.keys(data[0]);
  const maxLengths = {};
  for (const header of headers) {
    let maxLength = header.length;
    for (const row of data) {
      const value = row[header];
      maxLength = Math.max(maxLength, `${value}`.length);
    }
    maxLengths[header] = maxLength;
  }

  const table = [[], [], []];
  for (const header of headers) {
    const neededLength = maxLengths[header] + 2;
    const space = "-".repeat(neededLength);
    table[0].push("-".repeat(neededLength));
    table[1].push(
      ` ${capitalize(header)}${" ".repeat(neededLength - header.length - 1)}`
    );
    table[2].push("-".repeat(neededLength));
  }

  for (const row of data) {
    const rowStr = [];
    for (const header of headers) {
      const neededLength = maxLengths[header] + 2;
      const value = row[header];
      rowStr.push(
        ` ${value}${" ".repeat(neededLength - `${value}`.length - 1)}`
      );
    }
    table.push(rowStr);
  }

  let result = "";
  for (const row of table) {
    if (row[0].startsWith("-")) {
      row[0] = "+" + row[0];
      row[row.length - 1] = row[row.length - 1] + "+";
      result += row.join("+") + "\n";
      continue;
    }

    row[0] = "|" + row[0];
    row[row.length - 1] = row[row.length - 1] + "|";
    result += row.join("|") + "\n";
  }

  result += table[0].join("+");

  return result;
}
