buffer = File.read('input.txt').to_s.split('')

batch_size = 14 # 4 for the first half
x = 0
while x < buffer.size do
  break if buffer[x...x+batch_size].uniq.size == batch_size
  x += 1
end

puts x+batch_size