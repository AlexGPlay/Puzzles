const fs = require("fs");

const lines = fs
  .readFileSync("advent of code/adventofcode.com/2022/07/input.txt")
  .toString()
  .split("\n");

const buildBaseDirectory = (name, parent = null) => ({
  name,
  size: null,
  content: {},
  parent,
  type: "folder",
});

const buildFile = (name, parent, size) => ({
  name,
  size,
  parent,
  type: "file",
});

let maxSize = 100000;
let summedSize = 0;

const diskSpace = 70000000;
const neededSpace = 30000000;

const folders = [];

const computeSize = (directory) => {
  let computedSize = 0;
  for (let resource of Object.values(directory.content)) {
    if (resource.size) computedSize += resource.size;
    else {
      computedSize += computeSize(directory.content[resource.name]);
    }
  }
  directory.size = computedSize;
  folders.push(directory);
  if (directory.type === "folder" && computedSize < maxSize) {
    summedSize += computedSize;
  }

  return computedSize;
};

const directories = {};
directories["/"] = buildBaseDirectory("/");

let currentDirectory = null;
let line = 0;

while (line < lines.length) {
  const lineTxt = lines[line];
  const [command, args] = lineTxt.substring(2).split(" ");

  if (command.includes("ls")) {
    line++;
    let resource = lines[line];
    while (resource && !resource.includes("$")) {
      const [size, filename] = resource.split(" ");
      currentDirectory.content[filename] = size.includes("dir")
        ? buildBaseDirectory(filename, currentDirectory)
        : buildFile(filename, currentDirectory, parseInt(size));
      line++;
      resource = lines[line];
    }
  } else if (command.includes("cd")) {
    if (args.includes("..")) {
      if (currentDirectory.parent) currentDirectory = currentDirectory.parent;
    } else if (args.includes("/")) {
      currentDirectory = directories["/"];
    } else {
      let directory = currentDirectory.content[args];
      if (!directory) {
        directory = buildBaseDirectory(args, currentDirectory);
      }
      currentDirectory = directory;
    }
    line++;
  }
}

computeSize(directories["/"]);

console.log(summedSize);

// Part 2
const availableSpace = diskSpace - directories["/"].size;
const toRetrieveSpace = neededSpace - availableSpace;

const sortedFolders = folders
  .filter((folder) => folder.size >= toRetrieveSpace)
  .sort((folder1, folder2) => folder1.size - folder2.size);

console.log(sortedFolders[0].size);
