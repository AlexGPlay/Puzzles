/** @param {string} moves
 * @returns {true|[number, number]} Return true if robot returns or position
 */
function isRobotBack(moves) {
  const movements = {
    U: [0, 1],
    R: [1, 0],
    D: [0, -1],
    L: [-1, 0],
  };
  const invertMovement = {
    U: "D",
    R: "L",
    D: "U",
    L: "R",
  };

  const position = [0, 0];
  const movePosition = (modifier) => {
    position[0] += modifier[0];
    position[1] += modifier[1];
  };

  let i = 0;
  let lastMovement = null;
  while (i < moves.length) {
    const currentMove = moves[i];

    if (currentMove === "*") {
      const nextMove = moves[i + 1];
      const move = movements[nextMove];
      movePosition(move);
      movePosition(move);
      lastMovement = nextMove;
      i += 2;
    } else if (currentMove === "?") {
      const nextMove = moves[i + 1];
      if (nextMove !== lastMovement) {
        const move = movements[nextMove];
        movePosition(move);
      }
      i += 2;
    } else if (currentMove === "!") {
      const nextMove = moves[i + 1];
      const invertedMove = invertMovement[nextMove];
      const move = movements[invertedMove];
      movePosition(move);
      lastMovement = invertedMove;
      i += 2;
    } else {
      const move = movements[currentMove];
      movePosition(move);
      lastMovement = currentMove;
      i++;
    }
  }

  if (position[0] === 0 && position[1] === 0) {
    return true;
  }

  return position;
}
