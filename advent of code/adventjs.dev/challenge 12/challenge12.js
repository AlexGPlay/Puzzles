function getMinJump(obstacles) {
  const sortedObstacles = obstacles.sort((a, b) => a - b);
  const neededMaxLength = sortedObstacles[sortedObstacles.length - 1] + 1;

  for (let i = 1; i < neededMaxLength; i++) {
    let position = 0;
    while (true) {
      position += i;
      if (sortedObstacles.includes(position)) break;
      if (position > sortedObstacles[sortedObstacles.length - 1]) return i;
    }
  }

  return -1;
}
