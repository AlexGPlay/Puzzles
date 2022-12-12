function sudoku(puzzle) {
  const emptyData = [];

  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] !== 0) continue;
      emptyData.push([i, j]);
    }
  }

  backtrackPossibilities(puzzle, emptyData, 0);
  return puzzle;
}

function getRowPossibilities(puzzle, position) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return numbers.filter((number) => !puzzle[position].includes(number));
}

function getColumnPossibilities(puzzle, position) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const column = puzzle.map((row) => row[position]);
  return numbers.filter((number) => !column.includes(number));
}

function getQuadrantPossibilities(puzzle, row, column) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const rowCount = parseInt(row / 3) * 3;
  const columnCount = parseInt(column / 3) * 3;
  const quadrant = puzzle
    .slice(rowCount, rowCount + 3)
    .reduce((acc, row) => [...acc, ...row.slice(columnCount, columnCount + 3)], []);
  return numbers.filter((number) => !quadrant.includes(number));
}

function calculatePossibilities(puzzle, row, column) {
  const rowPossibilities = getRowPossibilities(puzzle, row);
  const columnPossibilities = getColumnPossibilities(puzzle, column);
  const quadrantPossibilities = getQuadrantPossibilities(puzzle, row, column);

  return rowPossibilities
    .filter((val) => columnPossibilities.includes(val))
    .filter((val) => quadrantPossibilities.includes(val));
}

function backtrackPossibilities(puzzle, possibilities, current) {
  const [row, column] = possibilities[current];
  const currentPossibilities = calculatePossibilities(puzzle, row, column);

  for (let i = 0; i < currentPossibilities.length; i++) {
    puzzle[row][column] = currentPossibilities[i];
    if (
      rowOrColumnHasRepeatedValues(puzzle, row) ||
      rowOrColumnHasRepeatedValues(puzzle, column) ||
      regionHasRepeatedValues(puzzle, row / 3 + column / 3)
    ) {
      puzzle[row][column] = 0;
      continue;
    }
    if (isValid(puzzle)) {
      return puzzle;
    }
    let success;
    if (current + 1 < Object.keys(possibilities).length) {
      success = backtrackPossibilities(puzzle, possibilities, current + 1);
    } else {
      success = isValid(puzzle);
    }
    if (success) {
      return success;
    }
    puzzle[row][column] = 0;
  }
}

function rowOrColumnHasRepeatedValues(board, position) {
  const row = board[position];
  const column = board.map((row) => row[position]);

  return repeatedInvalidValueInArray(row) || repeatedInvalidValueInArray(column);
}

function regionHasRepeatedValues(board, region) {
  let quadrant = [];
  for (let i = 0; i < board.length; i += 3) {
    for (let j = 0; j < board.length; j += 3) {
      quadrant = board.slice(i, i + 3).reduce((acc, row) => [...acc, ...row.slice(j, j + 3)], []);
      if (i + j / 3 === region) break;
    }
  }

  return repeatedInvalidValueInArray(quadrant);
}

function repeatedInvalidValueInArray(array) {
  const values = [];
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if (values.includes(value)) return true;
    if (value !== 0) values.push(value);
  }
  return false;
}

function isValid(board) {
  function checkRowsAndCols() {
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      if (new Set(row.filter((val) => val !== 0)).size < 9) return false;
      const column = board.map((row) => row[i]);
      if (new Set(column.filter((val) => val !== 0)).size < 9) return false;
    }

    return true;
  }

  function checkRegions() {
    for (let i = 0; i < board.length; i += 3) {
      for (let j = 0; j < board.length; j += 3) {
        const quadrant = board
          .slice(i, i + 3)
          .reduce((acc, row) => [...acc, ...row.slice(j, j + 3)], []);
        if (new Set(quadrant.filter((val) => val !== 0)).size < 9) return false;
      }
    }

    return true;
  }

  return checkRowsAndCols() && checkRegions();
}
