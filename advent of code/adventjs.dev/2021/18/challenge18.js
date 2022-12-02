export default function fixFiles(files) {
  const fileNamesCount = {};

  return files.map((fileName) => {
    const fileCount = fileNamesCount[fileName] || 0;
    if (fileCount > 0) {
      fileNamesCount[fileName] = fileCount + 1;
      return `${fileName}(${fileCount})`;
    }
    fileNamesCount[fileName] = 1;
    return fileName;
  });
}
