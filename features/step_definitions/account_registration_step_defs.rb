Given('that I am on the registration page') do
  visit('/registration')
end

When('I enter user name {string}') do |string|
  fill_in('user_name_field', with: string)
end

And('I enter user email {string}') do |string|
  fill_in('user_email_field', with: string)
end

And('I enter password {string}') do |string|
  fill_in('user_password_field', with: string)
end

And('I submit my information') do
  click_button('register_button')
end

And('I navigate to the user index as an admin user') do
  visit('/')
  wait_for_page_load
  fill_in('login_email_field', with: 'admin@example.com')
  fill_in('login_password_field', with: '123456')
  click_button('login')

  visit('/admin/users')
  wait_for_page_load
end

And('there does not exist a user with email {string}') do |email|
  refute has_content?(email)
end

And('there exists a user with email {string}') do |email|
  visit('/registration')
  wait_for_page_load
  fill_in('user_email_field', with: 'test')
  fill_in('user_email_field', with: email)
  fill_in('user_password_field', with: '123456')
  click_button('register_button')
  visit('/registration')
  wait_for_page_load
end

Then('there exists a user with name {string} and email {string}') do |name, email|
  assert has_content?(name)
  assert has_content?(email)
end

Then('I receive a registration error message saying {string}') do |error_message|
  assert has_content?(error_message)
end

