# frozen_string_literal: true

Given('that I am logged in as an administrator') do
  email = 'admin@example.com'
  password = '123456'
  User.create(name: 'admin', email: email, password: password, admin: true, approved: true)
  visit('/')
  wait_for_page_load
  fill_in('login_email_field', with: email)
  fill_in('login_password_field', with: password)
  click_button('login')
end

Given('that I am logged in as a student with emil {string}') do |string|
  password = '123456'
  User.create(name: 'admin', email: string, password: password, admin: false, approved: true)
  visit('/')
  wait_for_page_load
  fill_in('login_email_field', with: string)
  fill_in('login_password_field', with: password)
  click_button('login')
end

When('I click the {string} button') do |string|
  click_button(string)
end

Then('I receive a message saying {string}') do |string|
  wait_for_page_load
  assert has_content?(string)
end

Then('I receive an error message saying {string}') do |string|
  wait_for_page_load
  assert has_content?(string)
end

Then('I receive a notification error message saying {string}') do |string|
  wait_for_extended_page_load
  assert has_content?(string)
end
