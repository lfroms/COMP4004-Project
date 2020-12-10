# frozen_string_literal: true

Given('I am on the course offering index') do
  visit('admin/offerings')
end

Given('there exists a term {string}') do |string|
  dates = string.split(' - ')
  @term = Term.create!(
    start_date: Time.zone.parse(dates.first),
    end_date: Time.zone.parse(dates.last),
    registration_deadline: Time.zone.parse(dates.first),
    withdrawal_deadline: Time.zone.parse(dates.first) + 5,
  )
end

Given('there exists a course offering for course with code {string} section {string}') do |string, string2|
  course = Course.find_by(code: string)
  Offering.create!(section: string2, course: course, term_id: @term.id)
end

Given('user with email {string} is the professor for course offering for course with code {string} with section {string} and term {string}') do |email, code, section, _term|
  prof = User.find_by(email: email)
  course = Course.find_by(code: code)
  offering = Offering.find_by(section: section, course_id: course.id, term_id: @term.id)

  Enrollment.create!(role: 'professor', offering: offering, user: prof)
end

Given('I am viewing the deliverable creation form for course offering for course with code {string} with section {string} and term {string}') do |code, section, _term|
  course = Course.find_by(code: code)
  offering = Offering.find_by(course_id: course.id, section: section)

  visit("/courses/#{offering.id}")
  click_button('add_deliverable_button')
end

When('I enter section {string}') do |string|
  fill_in('offering_section_field', with: string)
end

When('I enter capacity {int}') do |int|
  field = find('.ant-input-number-input')
  field.fill_in(with: int)
end

When('I select course {string}') do |string|
  find('#offering_course_select', visible: false).click
  find('.offering_form_course_option', text: string).click
end

When('I select term {string}') do |string|
  find('#offering_term_select', visible: false).click
  find('.offering_form_term_option', text: string).click
end

When('I click the delete offering button') do
  click_button('delete_offering')
end

Then('there now exists a course offering for course with code {string} section {string} term {string}') do |string, string2, string3|
  index = find('#offering_index')              # from Capybara::Node::Finders
  assert index.has_content?(string)
  assert index.has_content?(string2)
  assert index.has_content?(string3)
end

Then('there no longer exists a course offering for course with code {string} section {string} term {string}') do |string, string2, string3|
  index = find('#offering_index')              # from Capybara::Node::Finders
  refute index.has_content?(string)
  refute index.has_content?(string2)
  refute index.has_content?(string3)
end

Then('there still exists a course offering for course with code {string} section {string} term {string}') do |string, string2, string3|
  index = find('#offering_index')              # from Capybara::Node::Finders
  assert index.has_content?(string)
  assert index.has_content?(string2)
  assert index.has_content?(string3)
end
