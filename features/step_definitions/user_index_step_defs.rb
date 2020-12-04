# frozen_string_literal: true

Given('there exists a user with email {string} and approved status {string}') do |string, string2|
  approved = string2 == 'true' ? true : false
  User.create(name: "Not Approved", email: string, approved: approved)
end

Given('I am on the user index') do
  wait_for_page_load
  visit('/admin/users')
  wait_for_page_load
end

When('I click the approve button for the user') do
  button = find('.approve_user_button').first
  button.click
end

Then('the user with email {string} has approved status {string}') do |string, string2|
  assert User.find_by(email: string), string2 == "true"
end

