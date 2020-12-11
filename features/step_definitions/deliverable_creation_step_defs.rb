# frozen_string_literal: true
When('I enter deliverable title {string}') do |string|
  fill_in('deliverable_title_field', with: string)
end

When('I enter deliverable description {string}') do |string|
  fill_in('deliverable_description_field', with: string)
end

When('I enter deliverable weight {string}') do |string|
  fill_in('deliverable_weight_field', with: string)
end

When('I enter deliverable due date {string}') do |string|
  fill_in('deliverable_due_date_field', with: string)
end

When('there exists a deliverable called {string} for course offering for course with code {string} with section {string}') do |string, string2, string3|
  course = Course.find_by(code: string2)
  offering = Offering.find_by(course: course, section: string3)

  Deliverable.create!(title: string, weight: 0.15, description: 'this is a deliverable', due_date: Time.zone.local(2020, 12, 1, 4, 5, 6), offering: offering)
end

Then('there exists a deliverable with title {string} with the description {string}') do |title, description|
  assert_text title
  assert_text description
end
