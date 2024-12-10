/**
 * @param {string[]} instructions - The instructions to execute
 * @returns {number} The value of the register A
 */
function compile(instructions) {
  const registers = {};
  let instructionIdx = 0;

  const INSTRUCTIONS = {
    MOV: (value, register) => {
      if (isNaN(value)) {
        registers[register] = registers[value] || 0;
      } else {
        registers[register] = Number(value);
      }
      instructionIdx++;
    },
    INC: (register) => {
      registers[register] = (registers[register] || 0) + 1;
      instructionIdx++;
    },
    DEC: (register) => {
      registers[register] = (registers[register] || 0) - 1;
      instructionIdx++;
    },
    JMP: (register, value) => {
      const registerValue = registers[register] || 0;
      if (registerValue === 0) instructionIdx = Number(value);
      else instructionIdx++;
    },
  };

  while (instructionIdx < instructions.length) {
    const instructionData = instructions[instructionIdx].split(" ");
    const instruction = instructionData[0];
    const args = instructionData.slice(1);
    INSTRUCTIONS[instruction](...args);
  }

  return registers["A"];
}
