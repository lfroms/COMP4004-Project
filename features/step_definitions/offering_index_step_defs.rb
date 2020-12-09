# frozen_string_literal: true

Given('I am on the course offering index') do
  visit('admin/offerings')
end

Given('there exists a term {string}') do |string|
  dates = string.split(' - ')
  @term = Term.create(
    start_date: Time.zone.parse(dates.first),
    end_date: Time.zone.parse(dates.last),
    registration_deadline: Time.zone.local(2020, 9, 1, 4, 5, 6),
    withdrawal_deadline: Time.zone.local(2020, 10, 1, 4, 5, 6),
    financial_deadline: Time.zone.local(2020, 9, 30, 4, 5, 6)
  )
end

Given('there exists a course offering for course with code {string} section {string}') do |string, string2|
  course = Course.find_by(code: string)
  Offering.create(section: string2, course: course, term: @term)
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
