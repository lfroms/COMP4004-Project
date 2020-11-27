# frozen_string_literal: true
require 'cucumber/rails'
require 'selenium-webdriver'

session = Capybara::Session.new(:selenium_chrome)

Given('that I am logged in as an administrator') do
  session.visit('/')
  session.fill_in('login_email_field', with: 'admin@example.com')
  session.fill_in('login_password_field', with: '123456')
  session.click_button('login')
end

Given('I am on the course index') do
  session.visit('/admin/courses')
end

Given('there exists a course with code {string}') do |string|
  assert session.has_content?(string)
end

Given('there does not exist a course with code {string}') do |string|
  refute session.has_content?(string)
end

When('I click the {string} button') do |string|
  session.click_button(string)
end

When('I enter code {string}') do |string|
  session.fill_in('course_code_field', with: string)
end

When('I enter name {string}') do |string|
  session.fill_in('course_name_field', with: string)
end

When('I submit the form') do
  session.click_button('course_create_submit')
end

Then('there exists a course with code {string} name {string}') do |string, string2|
  assert session.has_content?(string)
  assert session.has_content?(string2)
end

Then('I receive an error message saying {string}') do |string|
  assert session.has_content?(string)
end

Then('there exists only one course with code {string}') do |string|
  assert_equal 1, find('a', text: string).count
end

Around do |_scenario, block|
  DatabaseCleaner.cleaning(&block)
end

After do
  session.visit('/')
  session.execute_script('localStorage.clear()')
  session.execute_script('window.location.reload()')
end
