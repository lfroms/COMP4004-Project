# frozen_string_literal: true

Given('I am viewing the list of offered courses for the current term') do
  visit("terms/#{@term.id}/courses")
end

When('I click the enroll button') do
  click_button('enroll_button')
end

Given('student with email {string} is a self-enrolling user') do |string|
  user = User.find_by(email: string)
  group = Group.create!(name: 'Self-enrolling users', can_self_enroll: true)
  group.users << user
end

Given('there exists a course offering for course with code {string} section {string} capacity {int} for the current term') do |string, string2, int|
  course = Course.find_by(code: string)
  Offering.create!(section: string2, course: course, term: @term, capacity: int)
end

Given('there exists a course offering for course with code {string} section {string} for the current term') do |string, string2|
  course = Course.find_by(code: string)
  Offering.create!(section: string2, course: course, term: @term, capacity: 100)
end

Given('a student is already enrolled in course offering with code {string} section {string}') do |string, string2|
  course = Course.find_by(code: string)
  offering = Offering.find_by(course: course, section: string2, term: @term)
  user = User.create(name: 'Other User', email: 'other@email.com', password: '123456')
  group = Group.create!(name: 'more self-enrolling users', can_self_enroll: true)
  group.users << user
  Enrollment.create(offering: offering, user: user, role: 'student')
end

Given('student with email {string} is enrolled in course offering with code {string} section {string} for the current term') do |string, string2, string3|
  course = Course.find_by(code: string2)
  offering = Offering.find_by(course: course, section: string3, term: @term)
  user = User.create(name: 'Other User', email: string, password: '123456')
  group = Group.create!(name: 'more self-enrolling users', can_self_enroll: true)
  group.users << user
  Enrollment.create(offering: offering, user: user, role: 'student')
end

Given('student with email {string} is already enrolled in course with code {string} section {string}') do |string, string2, string3|
  course = Course.find_by(code: string2)
  offering = Offering.find_by(course: course, section: string3)
  user = User.find_by(email: string)
  Enrollment.create(offering: offering, user: user, role: 'student')
end

Given('course with code {string} has prerequisite {string}') do |string, string2|
  course = Course.find_by(code: string)
  prerequisite = Course.find_by(code: string2)
  course.prerequisites << prerequisite
end

Given('student with email {string} has passed course with code {string}') do |string, string2|
  term = Term.create!(
    start_date: Time.zone.local(2018, 9, 1, 4, 5, 6),
    end_date: Time.zone.local(2018, 12, 31, 4, 5, 6),
    registration_deadline: Time.zone.local(2018, 9, 1, 4, 5, 6),
    withdrawal_deadline: Time.zone.local(2018, 10, 1, 4, 5, 6),
  )

  user = User.find_by(email: string)
  course = Course.find_by(code: string2)
  offering = Offering.create!(section: 'A', course: course, term: term, capacity: 100)
  Enrollment.create!(offering: offering, user: user, role: 'student', final_grade: 'A')
end

Then('student with email {string} is no longer enrolled in course offering with code {string} section {string} term {string}') do |string, string2, string3, string4|
  visit('/logout')
  email = string
  password = '123456'
  User.create(name: 'student', email: email, password: password, admin: false, approved: true)
  visit('/')
  fill_in('login_email_field', with: email)
  fill_in('login_password_field', with: password)
  click_button('login')
  visit('/courses')
  assert has_no_text?("$#{string2} #{string3} (#{string4})")
end
