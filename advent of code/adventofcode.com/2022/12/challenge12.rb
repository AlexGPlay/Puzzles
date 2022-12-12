require 'rgl/adjacency'
require 'rgl/dijkstra'

example_input = File.read('exampleInput.txt').split("\n").map{|line| line.split('')}
input = File.read('input.txt').split("\n").map{|line| line.split('')}

SEARCH_POSITIONS = [
  [0,1],
  [0,-1],
  [1,0],
  [-1,0]
]

def prepare_graph(input)
  graph = RGL::DirectedAdjacencyGraph.new
  input.each_with_index{|row, i| row.each_with_index{|column, j| graph.add_vertices("#{i},#{j}")}}
  weights = build_weights(input)
  weights.keys.each{|c1, c2| graph.add_edge(c1, c2)}
  [graph, weights]
end

def get_value(elem)
  return 'a'.ord if elem == 'S'
  return 'z'.ord if elem == 'E'
  elem.ord
end

def build_weights(input)
  weights = {}

  input.each_with_index do |row, i|
    row.each_with_index do |elem, j|
      SEARCH_POSITIONS.each do |position|
        next if i+position[0] <  0 || j+position[1] <  0
        to_elem = input[i+position[0]][j+position[1]] rescue nil
        next if to_elem.nil?
        next if !(get_value(to_elem) == get_value(elem) || get_value(elem) + 1 == get_value(to_elem) || get_value(to_elem) < get_value(elem))
        weights[["#{i},#{j}", "#{i+position[0]},#{j+position[1]}"]] = 1
      end
    end
  end

  weights
end

def find_point(input, value)
  row, i = input.each_with_index.find{|row, idx| row.include?(value)}
  [i, row.index(value)]
end

def find_path(input)
  graph, weights = prepare_graph(input)
  start_point = find_point(input, 'S').join(',')
  end_point = find_point(input, 'E').join(',')
  graph.dijkstra_shortest_path(weights, start_point, end_point)
end

def lowest_start(input)
  graph, weights = prepare_graph(input)
  end_point = find_point(input, 'E').join(',')
  smallest = nil

  input.each_with_index do |row, i|
    row.each_with_index do |elem, j|
      next if elem != 'a'
      distance = graph.dijkstra_shortest_path(weights, "#{i},#{j}", end_point)
      smallest = distance.size - 1 if smallest.nil? || !distance.nil? && (distance.size - 1) < smallest
    end
  end

  smallest
end

puts find_path(input).size - 1 # Part 1
puts lowest_start(input) # Part 2