export default function canMouseEat(direction, game) {
  const movement = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
  };

  const findMosuePosition = (game) => {
    for (let i = 0; i < game.length; i++) {
      for (let j = 0; j < game[i].length; j++) {
        if (game[i][j] === "m") {
          return [i, j];
        }
      }
    }
  };

  const findFoodPositions = (game) => {
    const positions = [];

    for (let i = 0; i < game.length; i++) {
      for (let j = 0; j < game[i].length; j++) {
        if (game[i][j] === "*") {
          positions.push([i, j]);
        }
      }
    }

    return positions;
  };

  const mousePosition = findMosuePosition(game);
  const foodPositions = findFoodPositions(game);

  const newMousePosition = [
    mousePosition[0] + movement[direction][0],
    mousePosition[1] + movement[direction][1],
  ];

  return foodPositions.some(([x, y]) => x === newMousePosition[0] && y === newMousePosition[1]);
}
