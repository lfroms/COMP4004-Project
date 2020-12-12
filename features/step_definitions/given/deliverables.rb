# frozen_string_literal: true

Given('there exists a deliverable called {string} for course offering for course with code {string} section {string}') do |title, code, section|
  course = Course.find_by(code: code)
  offering = Offering.find_by(course: course, section: section, term: @term)

  Deliverable.create!(title: title, weight: 0.15, description: 'this is a deliverable', due_date: Time.zone.local(2020, 12, 1, 4, 5, 6), offering: offering)
end
