# frozen_string_literal: true
require 'cucumber/rails'
require 'selenium-webdriver'

Given('I am on the course offering index') do
  wait_for_page_load
  visit('/courses')
end

Given('there exists a course {string}') do |string|
  assert has_content?(string)
end

Given('there exists a term {string}') do |string|
  assert has_content?(string)
end

Given('there exists a course offering for course with code {string} with section {string} and term {string}') do |string, string2, string3|
  assert has_content?(string)
  assert has_content?(string2)
  assert has_content?(string3)
end

Given('there does not exist a course offering for course with code {string} with section {string} and term {string}') do |string, string2, string3|
  refute has_content?(string)
  refute has_content?(string2)
  refute has_content?(string3)
end

When('I enter section {string}') do |string|
  fill_in('course_code_field', with: string)
end

When('I select course {string}') do |_string|
  pending # Write code here that turns the phrase above into concrete actions
end

When('I select term {string}') do |_string|
  pending # Write code here that turns the phrase above into concrete actions
end

Then('there exists a course offering for course with code {string} with section {string} and term {string}') do |string, string2, string3|
  assert has_content?(string)
  assert has_content?(string2)
  assert has_content?(string3)
end

Then('there exists only one course offering for course with code {string} with section {string} and term {string}') do |string, string2, string3|
  assert_equal 1, find('a', text: string).count
  assert_equal 1, find('a', text: string2).count
  assert_equal 1, find('a', text: string3).count
end
