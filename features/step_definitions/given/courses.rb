# frozen_string_literal: true

Given('there exists a course with code {string}') do |code|
  Course.create!(code: code, name: 'Existent course')
end

### PREREQUISITES ###

Given('course with code {string} has prerequisite {string}') do |code, prerequisite_code|
  course = Course.find_by(code: code)
  prerequisite = Course.find_by(code: prerequisite_code)
  course.prerequisites << prerequisite
end
