# frozen_string_literal: true

### LOGIN AND REGISTRATION ###

Given('that I am on the login page') do
  visit('/login')
end

Given('that I am on the registration page') do
  visit('/registration')
end

### ADMIN ###

Given('I am on the course index') do
  visit('/admin/courses')
end

Given('I am on the course offering index') do
  visit('admin/offerings')
end

Given('I am on the user index') do
  visit('/admin/users')
end

### COURSES FROM STUDENT PERSPECTIVE ###

# TODO: Term argument is unused.
Given('I am viewing the deliverable creation form for course offering for course with code {string} with section {string} and term {string}') do |code, section, _term|
  course = Course.find_by(code: code)
  offering = Offering.find_by(course_id: course.id, section: section)

  visit("/courses/#{offering.id}")
  click_button('add_deliverable_button')
end

Given('I am on the enrollments index') do
  visit('/courses')
end

### COURSE DIRECTORY ###

Given('I am viewing the list of offered courses for the current term') do
  visit("terms/#{@term.id}/courses")
end
