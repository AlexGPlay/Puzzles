const fs = require("fs");

const lines = fs
  .readFileSync("./advent of code/adventofcode.com/15/input.txt")
  .toString()
  .split("\n")
  .map((line) =>
    line
      .trim()
      .split("")
      .map((elem) => parseInt(elem))
  );

function getAvailableNeighbours(i, j, lines) {
  const neighbours = [];

  if (lines[i]?.[j - 1]) neighbours.push([i, j - 1]);
  if (lines[i]?.[j + 1]) neighbours.push([i, j + 1]);
  if (lines[i - 1]?.[j]) neighbours.push([i - 1, j]);
  if (lines[i + 1]?.[j]) neighbours.push([i + 1, j]);

  return neighbours;
}

const nodes = (function buildNodes(lines) {
  const nodes = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      nodes.push(`${i};${j}`);
    }
  }
  return nodes;
})(lines);

const adjacencyMatrix = (function buildAdjacencyMatrix(lines) {
  const adjacencyMatrix = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      const adjacency = new Array(lines.length * lines[i].length).fill(0);
      const neighbours = getAvailableNeighbours(i, j, lines);
      const neighboursPositions = neighbours.map(([i, j]) => nodes.indexOf(`${i};${j}`));
      neighboursPositions.forEach((position) => (adjacency[position] = 1));
      adjacencyMatrix.push(adjacency);
    }
  }
  return adjacencyMatrix;
})(lines);

const weightsMatrix = (function buildWeightsMatrix(lines) {
  const weightsMatrix = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      const weights = new Array(lines.length * lines[i].length).fill(0);
      const neighbours = getAvailableNeighbours(i, j, lines);
      neighbours.forEach(([i, j]) => (weights[nodes.indexOf(`${i};${j}`)] = lines[i][j]));

      weightsMatrix.push(weights);
    }
  }
  return weightsMatrix;
})(lines);

function getNode(node) {
  return nodes.indexOf(node);
}

function minimumCost(distances, visited) {
  let nextNode = -1;
  let minimumCost = Number.MAX_VALUE;

  for (let i = 0; i < visited.length; i++) {
    if (visited[i]) continue;
    if (distances[i] < minimumCost) {
      minimumCost = distances[i];
      nextNode = i;
    }
  }

  return nextNode;
}

function dijkstra(node) {
  const currentNode = getNode(node);

  if (currentNode === -1) return null;

  const distance = new Array(nodes.length);
  const step = new Array(nodes.length);
  const visited = new Array(nodes.length).fill(false);

  for (let i = 0; i < nodes.length; i++) {
    if (!adjacencyMatrix[currentNode][i]) {
      distance[i] = Number.POSITIVE_INFINITY;
      step[i] = -1;
    } else {
      distance[i] = weightsMatrix[currentNode][i];
      step[i] = currentNode;
    }
  }

  visited[currentNode] = true;
  distance[currentNode] = 0;
  step[currentNode] = currentNode;

  let nextNode = minimumCost(distance, visited);

  while (nextNode !== -1) {
    visited[nextNode] = true;

    for (let i = 0; i < nodes.length; i++) {
      if (adjacencyMatrix[nextNode][i]) {
        const appliedWeight = distance[nextNode] + weightsMatrix[nextNode][i];
        if (appliedWeight >= distance[i]) continue;
        distance[i] = appliedWeight;
        step[i] = nextNode;
      }
    }

    nextNode = minimumCost(distance, visited);
  }

  return [distance, step];
}

const [distance] = dijkstra(`0;0`);

console.log(distance[distance.length - 1]); // 609
