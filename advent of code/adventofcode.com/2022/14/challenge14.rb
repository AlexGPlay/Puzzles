require 'pry'


def build_area(input, part2)
  parsed_input = input.map{|entry| entry.split(' -> ').map{|coords| coords.split(',').map(&:to_i)}}
  j_elems = parsed_input.map{|entry| entry.map{|elem| elem[0]}}.flatten
  i_elems = parsed_input.map{|entry| entry.map{|elem| elem[1]}}.flatten
  
  min_j = part2 ? [0, j_elems.min - 1000].max : j_elems.min
  max_j = part2 ? j_elems.max + 1000 : j_elems.max

  if part2
    i_elems << i_elems.max + 2
    parsed_input << [[min_j, i_elems.max], [max_j, i_elems.max]]
  end

  area = Array.new(i_elems.max + 1).map{Hash.new}

  area.each{|area_entry| ((min_j - 1)..(max_j + 1)).each{|j| area_entry[j] = '.'}}

  parsed_input.each do |entry|
    i = 1
    while i < entry.size
      elem1 = entry[i - 1]
      elem2 = entry[i]

      if elem1[0] == elem2[0]
        (([elem1[1], elem2[1]].min)..([elem1[1], elem2[1]].max)).each{|coord| area[coord][elem1[0]] = '#'}
      else
        (([elem1[0], elem2[0]].min)..([elem1[0], elem2[0]].max)).each{|coord| area[elem1[1]][coord] = '#'}
      end

      i += 1
    end
  end

  area
end

def print_area(area)
  puts area.map{|entry| entry.values.join('')}.join("\n")
end

def pour_sand(area, from, part2)
  sand = from.dup

  return false if part2 && area[from[0]][from[1]] == 'o'

  loop do
    if area[sand[0] + 1].nil?
      return false
    elsif area[sand[0] + 1][sand[1]] == '.'
      sand[0] += 1
    elsif area[sand[0] + 1][sand[1] - 1] == '.'
      sand[0] += 1
      sand[1] -= 1
    elsif area[sand[0] + 1][sand[1] + 1] == '.'
      sand[0] += 1
      sand[1] += 1
    else 
      area[sand[0]][sand[1]] = 'o'
      return true
    end
  end
end

def solve(input, part2 = false, sand_point = [0, 500])
  data = File.read(input).split("\n")
  area = build_area(data, part2)
  
  can_pour_sand = true
  i = 0

  while can_pour_sand
    can_pour_sand = pour_sand(area, sand_point, part2)
    i += 1
  end

  i - 1
end

puts solve('input.txt')
puts solve('input.txt', true)