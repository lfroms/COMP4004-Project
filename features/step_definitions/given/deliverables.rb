# frozen_string_literal: true

Given('there exists a deliverable called {string} for course offering for course with code {string} section {string} for the current term') do |title, code, section|
  course = Course.find_by(code: code)
  offering = Offering.find_by(course: course, section: section, term: @term)

  Deliverable.create!(title: title, weight: 0.15, description: 'this is a deliverable', due_date: Time.zone.local(2020, 12, 1, 4, 5, 6), offering: offering)
end

Given('there exists a deliverable called {string} with due date later than today for course offering for course with code {string} section {string} for the current term') do |title, code, section|
  course = Course.find_by(code: code)
  offering = Offering.find_by(course: course, section: section, term: @term)

  Deliverable.create!(title: title, weight: 0.15, description: 'this is a deliverable', due_date: Time.zone.today + 1, offering: offering)
end
