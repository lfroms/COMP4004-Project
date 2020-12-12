# frozen_string_literal: true
When('I enter email {string}') do |email|
  fill_in('login_email_field', with: email)
end

When('I enter password {string}') do |password|
  fill_in('login_password_field', with: password)
end
