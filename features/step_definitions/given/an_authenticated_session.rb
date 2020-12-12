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

Given('I successfully log in as a user with email {string}') do |email|
  password = '123456'
  User.create(name: 'admin', email: email, password: password, admin: false, approved: true)
  visit('/')
  fill_in('login_email_field', with: email)
  fill_in('login_password_field', with: password)
  click_button('login')

  assert_current_path '/courses' # Wait for redirect before proceeding
end
