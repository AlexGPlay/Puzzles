FIRST_COLUMN_FROM = 65
SECOND_COLUMN_FROM = 88

SCORES = [[3, 0, 6], [6, 3, 0], [0, 6, 3]]

file_data = File.open('input.txt').to_a
puts(file_data.sum do |match|
  first, second = match.split(' ')
  
  match_score = SCORES[second.ord - SECOND_COLUMN_FROM][first.ord - FIRST_COLUMN_FROM]

  pick_score = second.ord - SECOND_COLUMN_FROM + 1

  match_score + pick_score
end)

# SECOND PART

NEEDED_SCORE = [0, 3, 6]
puts(file_data.sum do |match|
  first, second = match.split(' ')
  
  match_score = NEEDED_SCORE[second.ord - SECOND_COLUMN_FROM]
  enemy_pick_idx = first.ord - FIRST_COLUMN_FROM

  pick_score = SCORES.map{|pick| pick[enemy_pick_idx]}.index(match_score) + 1
  match_score + pick_score
end)