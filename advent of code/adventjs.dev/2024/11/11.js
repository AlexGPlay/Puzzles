/**
 * @param {string} filename - The filename to decode.
 * @returns {string} The decoded filename.
 */
function decodeFilename(filename) {
  const { name } = /\d+_(?<name>.*)/.exec(filename).groups;
  const splitName = name.split(".");

  return `${splitName[0]}.${splitName[1]}`;
}
