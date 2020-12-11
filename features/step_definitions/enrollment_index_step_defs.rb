# frozen_string_literal: true

Given('student with email {string} is enrolled in course with code {string} section {string}') do |string, string2, string3|
  user = User.find_by(email: string)
  course = Course.find_by(code: string2)
  offering = Offering.find_by(course: course, term: @term, section: string3)
  @enrollment = Enrollment.create(user: user, offering: offering, role: 'student')
end

Given('student with email {string} has received a final grade in the enrollment') do |_string|
  @enrollment.update(final_grade: 'B')
end

Given('I am on the enrollments index') do
  visit('/courses')
end

When('I click the unenroll button') do
  button = find('#unenroll_button')
  button.click
end

Then('enrollment in course with code {string} section {string} no longer appears in my enrollments') do |string, string2|
  assert has_no_text?("#{string} #{string2}")
end

Then('enrollment in course with code {string} section {string} still appears in my enrollments') do |string, string2|
  assert has_text?("#{string} #{string2}")
end

Then('there is no unenroll button') do
  assert has_no_button?('unenroll_button')
end

Then('student with email {string} now owes {float} in fees') do |string, float|
  visit('/logout')
  student = User.find_by(email: string)
  email = 'admin@example.com'
  password = '123456'
  User.create(name: 'admin', email: email, password: password, admin: true, approved: true)
  visit('/')
  fill_in('login_email_field', with: email)
  fill_in('login_password_field', with: password)
  click_button('login')
  visit("/admin/users/#{student.id}")
  assert has_text?("$#{float}")
end

Then('student with email {string} has no final grade for the enrollment') do |_string|
  pending # Write code here that turns the phrase above into concrete actions
end

Then('student with email {string} has final grade {string} for the enrollment') do |_string, _string2|
  pending # Write code here that turns the phrase above into concrete actions
end
