const fs = require("fs");

const manhattanDistance = (point1, point2) => {};

const parseLine = (line) => {
  const regex =
    /Sensor at x=(?<sensorX>-?\d+), y=(?<sensorY>-?\d+): closest beacon is at x=(?<beaconX>-?\d+), y=(?<beaconY>-?\d+)/;
  const { sensorX, sensorY, beaconX, beaconY } = line.match(regex).groups;
  return {
    sensor: {
      x: parseInt(sensorX),
      y: parseInt(sensorY),
    },
    beacon: {
      x: parseInt(beaconX),
      y: parseInt(beaconY),
    },
    distance:
      Math.abs(parseInt(sensorX) - parseInt(beaconX)) +
      Math.abs(parseInt(sensorY) - parseInt(beaconY)),
  };
};

const parseFile = (file) => {
  return fs
    .readFileSync(file)
    .toString()
    .split("\n")
    .map((line) => parseLine(line));
};

const countImpossibles = (points, yPosition) => {
  const ranges = [];
  const beacons = [];

  for (let point of points) {
    const maxYReach = point.sensor.y + point.distance;
    const minYReach = point.sensor.y - point.distance;
    if (point.beacon.y === yPosition) {
      if (
        !beacons.some(
          (beacon) => beacon.x === point.beacon.x && beacon.y === point.beacon.y
        )
      )
        beacons.push({ x: point.beacon.x, y: point.beacon.y });
    }
    if (!(maxYReach >= yPosition && minYReach <= yPosition)) continue;
    const distance = Math.abs(yPosition - point.sensor.y);
    const sideDistance = point.distance - distance;

    for (
      let i = point.sensor.x - sideDistance;
      i <= point.sensor.x + sideDistance;
      i++
    ) {
      ranges.push(i);
    }
  }

  return new Set(ranges).size - beacons.length;
};

const checkIntersection = (point, otherPoint) => {
  const maxYReach = otherPoint.sensor.y + otherPoint.distance;
  const minYReach = otherPoint.sensor.y - otherPoint.distance;

  if (!(maxYReach >= point[0] && minYReach <= point[0])) return false;

  const distance = Math.abs(point[0] - otherPoint.sensor.y);
  const sideDistance = otherPoint.distance - distance;

  const maxXReach = otherPoint.sensor.x + sideDistance;
  const minXReach = otherPoint.sensor.x - sideDistance;

  return maxXReach >= point[1] && minXReach <= point[1];
};

const checkPerimeter = (point, otherPoints, boundingBox) => {
  for (let i = 0; i < point.distance; i++) {
    for (let movement of [
      [-i, -(point.distance + 1 - i)],
      [-i, point.distance + 1 - i],
      [i, -(point.distance + 1 - i)],
      [i, point.distance + 1 - i],
    ]) {
      const checkingPoint = [
        point.sensor.y + movement[0],
        point.sensor.x + movement[1],
      ];

      if (
        checkingPoint[0] < boundingBox[0] ||
        checkingPoint[0] > boundingBox[1]
      )
        continue;
      if (
        checkingPoint[1] < boundingBox[0] ||
        checkingPoint[1] > boundingBox[1]
      )
        continue;

      if (
        otherPoints.every(
          (otherPoint) => !checkIntersection(checkingPoint, otherPoint)
        )
      )
        return checkingPoint;
    }
  }
  return null;
};

const findEmptySpace = (points, boundingBox) => {
  for (let i = 0; i < points.length; i++) {
    const checkingPoint = points[i];
    const otherPoints = [...points];
    otherPoints.splice(i, 1);
    const result = checkPerimeter(checkingPoint, otherPoints, boundingBox);
    if (result) return result[1] * 4000000 + result[0];
  }
};

const solve = (input, position, boundingBox) => {
  const points = parseFile(input);
  const positions = countImpossibles(points, position);
  const beaconPoint = findEmptySpace(points, boundingBox);
  return [positions, beaconPoint];
};

console.log(
  "Sample",
  solve("advent of code/adventofcode.com/2022/15/sampleInput.txt", 10, [0, 20])
);
console.log(
  "Real",
  solve(
    "advent of code/adventofcode.com/2022/15/input.txt",
    2000000,
    [0, 4000000]
  )
);
