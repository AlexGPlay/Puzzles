require 'pry'

data = File.read('input.txt')
        .split("\n")
        .map{|row| row.split("").map(&:to_i)}


def is_visible?(matrix, i, j)
  horizontal = (0...j).all?{|elem_j| matrix[i][elem_j] < matrix[i][j]} || (j+1...matrix[i].size).all?{|elem_j| matrix[i][elem_j] < matrix[i][j]}
  vertical = (0...i).all?{|elem_i| matrix[elem_i][j] < matrix[i][j]} || (i+1...matrix.size).all?{|elem_i| matrix[elem_i][j] < matrix[i][j]}

  horizontal || vertical
end

def count_elems(reference_tree, other_trees)
  selected_trees = []

  other_trees.each do |tree|
    if tree < reference_tree
      selected_trees << tree
    else
      return selected_trees.size + 1
    end
  end
  
  selected_trees.size
end

def scenic_score(matrix, i, j)
  top = count_elems(matrix[i][j], (0...i).to_a.reverse.map{|elem_i| matrix[elem_i][j]})
  bottom = count_elems(matrix[i][j], (i+1...matrix.size).to_a.map{|elem_i| matrix[elem_i][j]})
  left = count_elems(matrix[i][j], (0...j).to_a.reverse.map{|elem_j| matrix[i][elem_j]})
  right = count_elems(matrix[i][j], (j+1...matrix[i].size).to_a.map{|elem_j| matrix[i][elem_j]})

  top * bottom * left * right
end

puts data.each_with_index.sum{|row, i| row.each_with_index.count{|_,j| is_visible?(data, i, j)}}
puts data.each_with_index.map{|row, i| row.each_with_index.map{|_,j| scenic_score(data, i, j)}}.flatten.max