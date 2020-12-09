# frozen_string_literal: true

Given('there exists a user with email {string} and approved status {string}') do |string, string2|
  approved = string2 == 'true' ? true : false
  User.create!(name: 'Not Approved', email: string, password: '123456', approved: approved)
end

Given('I am on the user index') do
  visit('/admin/users')
end

When('I click the approve button for the user') do
  user_id = User.find_by(name: 'Not Approved').id
  button = find("#approve_user_id_#{user_id}")
  button.click
end

Then('the user with email {string} has approved status {string}') do |string, string2|
  assert User.find_by(email: string), string2 == 'true'
end
