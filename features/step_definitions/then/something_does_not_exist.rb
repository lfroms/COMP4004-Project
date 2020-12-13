# frozen_string_literal: true

### GLOBAL ###

Then('there is no {string} button') do |text|
  assert has_no_button?(text)
end

### USERS ###

Then('the user with email {string} no longer exists') do |email|
  assert_no_text email
end

Then('the approve button for user with email {string} does not exist') do |email|
  user_id = User.find_by(email: email).id
  assert has_no_button?("approve_user_id_#{user_id}")
end

### COURSES ###

Then('there no longer exists a course with code {string}') do |code|
  index = find('#course_index')
  refute index.has_content?(code)
end

Then('new course with code {string} has no prerequisites') do |code|
  click_link(code.to_s)
  assert_text 'None'
end

### OFFERINGS ###

Then('there no longer exists a course offering for course with code {string} section {string} term {string}') do |code, section, term|
  index = find('#offering_index')
  refute index.has_content?(code)
  refute index.has_content?(section)
  refute index.has_content?(term)
end

### ENROLLMENTS ###

Then('enrollment in course with code {string} section {string} no longer appears in my enrollments') do |code, section|
  assert has_no_text?("#{code} #{section}")
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

Then('there is no enroll button for course code {string} section {string}') do |code, section|
  course = Course.find_by(code: code)
  offering = Offering.find_by(course: course, section: section, term: @term)
  assert has_no_button?("enroll_button#{offering.id}")
end

Then('there is no unenroll button for course code {string} section {string}') do |code, section|
  course = Course.find_by(code: code)
  offering = Offering.find_by(course: course, section: section, term: @term)
  assert has_no_button?("unenroll_button#{offering.id}")
end

### DELIVERABLES ###

Then('there does not exist a deliverable with title {string}') do |title|
  assert_no_text title
end

### TERMS ###

Then('the term with name {string} no longer exists') do |name|
  assert_no_text name
end
