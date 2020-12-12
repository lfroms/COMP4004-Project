# frozen_string_literal: true

### COURSES ###

When('I visit the show page for for course with code {string} section {string} for the current term') do |code, section|
  course = Course.find_by(code: code)
  offering_id = Offering.find_by(course: course, section: section, term: @term).id
  visit("admin/offerings/#{offering_id}")
end

When('I visit the participants page for course with code {string} section {string} for the current term') do |code, section|
  course = Course.find_by(code: code)
  offering_id = Offering.find_by(course: course, section: section, term: @term).id
  visit("courses/#{offering_id}/participants")
end

### DELIVERABLES ###

When('I navigate to the deliverable show page for the {string}') do |title|
  deliverable = Deliverable.find_by(title: title)
  visit("/courses/#{deliverable.offering_id}/deliverables/#{deliverable.id}")
end
