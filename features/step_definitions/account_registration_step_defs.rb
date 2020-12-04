# frozen_string_literal: true

Given('that I am on the registration page') do
  wait_for_page_load
  visit('/registration')
  wait_for_page_load
end

Given('there exists a user with email {string}') do |string|
  User.create(name: 'Existant User', email: string, password: '123456')
end

When('I enter user name {string}') do |string|
  fill_in('user_name_field', with: string)
end

When('I enter user email {string}') do |string|
  fill_in('user_email_field', with: string)
end

When('I enter user password {string}') do |string|
  fill_in('user_password_field', with: string)
end

