# frozen_string_literal: true

Given('I am on the course index') do
  wait_for_page_load
  visit('/admin/courses')
  wait_for_page_load
end

Given('there exists a course with code {string}') do |string|
  Course.create(code: string, name: 'Existent course')
end

When('I enter code {string}') do |string|
  fill_in('course_code_field', with: string)
end

When('I enter name {string}') do |string|
  fill_in('course_name_field', with: string)
end

When('I click the delete course button') do
  click_button('delete_course')
end

Then('there now exists a course with code {string} name {string}') do |string, string2|
  index = find('#course_index')              # from Capybara::Node::Finders
  assert index.has_content?(string)
  assert index.has_content?(string2)
end

Then('there still exists a course with code {string}') do |string|
  index = find('#course_index')              # from Capybara::Node::Finders
  assert index.has_content?(string)
end

Then('there no longer exists a course with code {string}') do |string|
  index = find('#course_index')              # from Capybara::Node::Finders
  refute index.has_content?(string)
end
