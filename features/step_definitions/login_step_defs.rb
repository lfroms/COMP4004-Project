# frozen_string_literal: true

Given('that I am on the login page') do
  wait_for_page_load
  visit('/login')
  wait_for_page_load
end

Given('there exists a user with email {string} password {string} approved status {string}') do |string, string2, string3|
  approved = string3 == 'true' ? true : false
  User.create(name: 'Not Approved', email: string, password: string2, approved: approved)
end

When('I enter email {string}') do |string|
  fill_in('login_email_field', with: string)
end

When('I enter password {string}') do |string|
  fill_in('login_password_field', with: string)
end

Then('I get redirected to courses') do
  wait_for_page_load
  assert_equal '/courses', current_path
end
