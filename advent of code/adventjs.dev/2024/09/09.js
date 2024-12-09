/**
 * @param {string[]} board - Represent the train situation
 * @param {'U' | 'D' | 'R' | 'L' } mov - Movement direction
 * @returns {'none' | 'crash' | 'eat'}
 */
function moveTrain(board, mov) {
  const movements = {
    L: [0, -1],
    R: [0, 1],
    U: [-1, 0],
    D: [1, 0],
  };

  const i = board.findIndex((row) => row.includes("@"));
  const j = board[i].indexOf("@");
  const enginePosition = [i, j];

  const newEnginePosition = [
    enginePosition[0] + movements[mov][0],
    enginePosition[1] + movements[mov][1],
  ];

  const newEnginePositionValue =
    board[newEnginePosition[0]]?.[newEnginePosition[1]];
  if (!newEnginePositionValue || newEnginePositionValue === "o") return "crash";
  if (newEnginePositionValue === "*") return "eat";

  return "none";
}
