20.times.each do |_index|
  Todo.create!(title: Faker::Lorem.question, done: _index.odd?)
end
