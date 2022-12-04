file_data = File.open('input.txt').to_a

# Part 1
puts(
  file_data.count do |entry|
    range1, range2 = entry.split(',').map{|r| (r.split('-')[0].to_i..r.split('-')[1].to_i)}
    range1.cover?(range2) || range2.cover?(range1)
  end
)

# Part 2
def overlaps?(range_a, range_b)
  range_b.begin <= range_a.end && range_a.begin <= range_b.end 
end 

puts(
  file_data.count do |entry|
    range1, range2 = entry.split(',').map{|r| (r.split('-')[0].to_i..r.split('-')[1].to_i)}
    overlaps?(range1, range2) || overlaps?(range2, range1)
    # Without overlaps? method => (range1.to_a & range2.to_a).any?
  end
)