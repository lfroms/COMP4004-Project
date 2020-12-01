# frozen_string_literal: true

Given('that I am logged in as an administrator') do
  visit('/')
  wait_for_page_load
  fill_in('login_email_field', with: 'admin@example.com')
  fill_in('login_password_field', with: '123456')
  click_button('login')
end

Given('I am on the course index') do
  wait_for_page_load
  visit('/admin/courses')
end

Given('there exists a course with code {string}') do |string|
  assert has_content?(string)
end

Given('there does not exist a course with code {string}') do |string|
  refute has_content?(string)
end

When('I click the {string} button') do |string|
  click_button(string)
end

When('I enter code {string}') do |string|
  fill_in('course_code_field', with: string)
end

When('I enter name {string}') do |string|
  fill_in('course_name_field', with: string)
end

When('I submit the form') do
  click_button('course_create_submit')
end

Then('there exists a course with code {string} name {string}') do |string, string2|
  assert has_content?(string)
  assert has_content?(string2)
end

Then('I receive an error message saying {string}') do |string|
  assert has_content?(string)
end

Then('there exists only one course with code {string}') do |string|
  find('a', text: string, count: 1)
end
