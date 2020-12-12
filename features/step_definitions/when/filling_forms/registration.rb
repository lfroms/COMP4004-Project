# frozen_string_literal: true

When('I enter user name {string}') do |name|
  fill_in('user_name_field', with: name)
end

When('I enter user email {string}') do |email|
  fill_in('user_email_field', with: email)
end

When('I enter user password {string}') do |password|
  fill_in('user_password_field', with: password)
end
