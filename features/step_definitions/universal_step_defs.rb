# frozen_string_literal: true

Given('I successfully log in as an administrator') do
  email = 'admin@example.com'
  password = '123456'
  User.create(name: 'admin', email: email, password: password, admin: true, approved: true)
  visit('/')
  fill_in('login_email_field', with: email)
  fill_in('login_password_field', with: password)
  click_button('login')

  assert_current_path '/courses' # Wait for redirect before proceeding
end

Given('I successfully log in as a student with email {string}') do |string|
  password = '123456'
  User.create(name: 'admin', email: string, password: password, admin: false, approved: true)
  visit('/')
  fill_in('login_email_field', with: string)
  fill_in('login_password_field', with: password)
  click_button('login')

  assert_current_path '/courses' # Wait for redirect before proceeding
end

Given('I successfully log in as a professor with email {string}') do |string|
  password = '123456'
  User.create(name: 'admin', email: string, password: password, admin: false, approved: true)
  visit('/')
  fill_in('login_email_field', with: string)
  fill_in('login_password_field', with: password)
  click_button('login')

  assert_current_path '/courses' # Wait for redirect before proceeding
end

When('I click the {string} button') do |string|
  click_button(string)
end

When('I fill field {string} in with {string}') do |id, input|
  fill_in(id, with: input)
end

Then('I receive a message saying {string}') do |string|
  assert_text string
end
