# frozen_string_literal: true

### COURSES ###

Then('there no longer exists a course with code {string}') do |code|
  index = find('#course_index') # from Capybara::Node::Finders
  refute index.has_content?(code)
end

Then('new course with code {string} has no prerequisites') do |code|
  click_link(code.to_s)
  assert_text 'None'
end

### OFFERINGS ###

Then('there no longer exists a course offering for course with code {string} section {string} term {string}') do |code, section, term|
  visit('admin/offerings')
  index = find('#offering_index')
  refute index.has_content?(code)
  refute index.has_content?(section)
  refute index.has_content?(term)
end

### ENROLLMENTS ###

Then('enrollment in course with code {string} section {string} no longer appears in my enrollments') do |code, section|
  assert has_no_text?("#{code} #{section}")
end

Then('student with email {string} has no final grade for the enrollment') do |_email|
  pending # Write code here that turns the phrase above into concrete actions
end

Then('student with email {string} is no longer enrolled in course offering with code {string} section {string} term {string}') do |email, code, section, term|
  visit('/logout')
  password = '123456'
  User.create(name: 'student', email: email, password: password, admin: false, approved: true)
  visit('/')
  fill_in('login_email_field', with: email)
  fill_in('login_password_field', with: password)
  click_button('login')
  visit('/courses')
  assert has_no_text?("$#{code} #{section} (#{term})")
end

Then('there are no enroll buttons') do
  assert has_no_button?('enroll_button')
end

Then('there is no unenroll button') do
  assert has_no_button?('unenroll_button')
end

Then('the approve button for user with email {string} disappears') do |string|
  pending # Write code here that turns the phrase above into concrete actions
end
