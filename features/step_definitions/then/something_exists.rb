# frozen_string_literal: true

### USERS ###

Then('the user has an approved status') do
  assert has_content?('Approved', count: 2) # New approval + existing admin
end

Then('there still exists a user with email {string}') do |email|
  assert_text email
end

Then('the user with email {string} no longer exists') do |email|
  assert_no_text email
end

### COURSES ###

Then('there now exists a course with code {string} name {string}') do |code, name|
  index = find('#course_index')
  assert index.has_content?(code)
  assert index.has_content?(name)
end

Then('there still exists a course with code {string}') do |code|
  index = find('#course_index')
  assert index.has_content?(code)
end

Then('new course with code {string} has prerequisite {string}') do |code, prerequisite|
  click_link(code.to_s)
  assert_text prerequisite
end

### OFFERINGS ###

Then('there now exists a course offering for course with code {string} section {string} term {string}') do |code, section, term|
  index = find('#offering_index')
  assert index.has_content?(code)
  assert index.has_content?(section)
  assert index.has_content?(term)
end

Then('there still exists a course offering for course with code {string} section {string} term {string}') do |code, section, term|
  index = find('#offering_index')
  assert index.has_content?(code)
  assert index.has_content?(section)
  assert index.has_content?(term)
end

### DELIVERABLES ###

Then('there exists a deliverable with title {string} with the description {string}') do |title, description|
  assert_text title
  assert_text description
end

### ENROLLMENTS ###

Then('enrollment in course with code {string} section {string} still appears in my enrollments') do |code, section|
  assert has_text?("#{code} #{section}")
end

Then('student with email {string} has final grade {string} for the enrollment') do |_email, _grade|
  pending # Write code here that turns the phrase above into concrete actions
end

### PROFESSOR ASSIGNMENT ###

Then('the professor for the course offering has name {string}') do |string|
  assert_text string
end

### FEES AND BALANCE ###

# TODO: Is too much going on here?
Then('student with email {string} now owes {float} in fees') do |email, amount|
  visit('/logout')
  student = User.find_by(email: email)
  email = 'admin@example.com'
  password = '123456'
  User.create(name: 'admin', email: email, password: password, admin: true, approved: true)
  visit('/')
  fill_in('login_email_field', with: email)
  fill_in('login_password_field', with: password)
  click_button('login')
  visit("/admin/users/#{student.id}")
  assert_text "$#{amount.to_i}"
end

### SUBMISSIONS ###

Then('there exists a graded submission with grade {string}% and attachment url {string}') do |grade, attachment_url|
  assert_text "#{grade} / 100"
  assert_text attachment_url
end
