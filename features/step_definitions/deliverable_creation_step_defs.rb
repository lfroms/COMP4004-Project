Then('there exists a deliverable with title {string} with the description {string}') do |title, description|
  assert_text title
  assert_text description
end

