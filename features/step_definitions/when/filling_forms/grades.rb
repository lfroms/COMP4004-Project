# frozen_string_literal: true

When('I enter a grade of {string}') do |grade|
  fill_in('grade_value_field', with: grade)
end

When('I enter a comment saying {string}') do |comment|
  fill_in('grade_comment_field', with: comment)
end
