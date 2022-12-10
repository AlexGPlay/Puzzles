instructions = File.read('input.txt').split("\n")

INSTRUCTIONS = {
  noop: {
    cycles: 1,
    operation: ->(param, register){ register }
  },
  addx: {
    cycles: 2,
    operation: ->(param, register){ param + register }
  }
}

OBSERVATION_INTERVAL = 40

signal_strenghts = []
observable_cycle = 20
x = 1
cycle = 0
crt = (0...6).map{('.'*40).split("")}

instructions.each do |instruction_line|
  instruction, param = instruction_line.split(" ")
  data = INSTRUCTIONS[instruction.to_sym]
  
  (0...data[:cycles]).each do
    cycle += 1

    drawing_positions = [x-1, x, x+1]
    cycle_position = (cycle % 40) - 1

    crt[((cycle - 1) / 40).to_i][cycle_position] = '#' if drawing_positions.include?(cycle_position)

    if cycle == observable_cycle
      observable_cycle += OBSERVATION_INTERVAL
      signal_strenghts << cycle * x
    end
  end

  x = data[:operation].call(param.to_i, x)
end

puts signal_strenghts.sum
crt.each{|row| puts row.join}