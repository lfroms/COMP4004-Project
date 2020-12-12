# frozen_string_literal: true

Given('there exists a course offering for course with code {string} section {string} capacity {int} for the current term') do |code, section, capacity|
  course = Course.find_by(code: code)
  Offering.create!(section: section, course: course, term: @term, capacity: capacity)
end

Given('there exists a course offering for course with code {string} section {string} for the current term') do |code, section|
  course = Course.find_by(code: code)
  Offering.create!(section: section, course: course, term: @term, capacity: 100)
end
