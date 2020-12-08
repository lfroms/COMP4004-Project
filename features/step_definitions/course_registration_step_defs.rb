# frozen_string_literal: true

Given('I am viewing the list of offered courses for term {string}') do |_string|
  visit("terms/#{@term.id}/courses")
end

When('I click the enroll button') do
  click_button('enroll')
end

Given('student with email {string} is a self-enrolling user') do |string|
  user = User.find_by(email: string)
  group = Group.create!(name: 'Self-enrolling users', can_self_enroll: true)
  group.users << user
end

Given('there exists a course offering for course with code {string} section {string} capacity {int}') do |string, string2, int|
  course = Course.find_by(code: string)
  Offering.create(section: string2, course: course, term: @term, capacity: int)
end

Given('a student is already enrolled in course offering with code {string} section {string}') do |string, string2|
  course = Course.find_by(code: string)
  offering = Offering.find_by(course: course, section: string2)
  user = User.create(name: 'Other User', email: 'other@email.com', password: '123456')
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

Given('that student with email {string} has not completed course with code {string}') do |_string, _string2|
  pending # Write code here that turns the phrase above into concrete actions
end

When('I select course offering for course with code {string} with section {string}') do |_string, _string2|
  pending # Write code here that turns the phrase above into concrete actions
end

When('course with code {string} has prerequisite {string}') do |_string, _string2|
  pending # Write code here that turns the phrase above into concrete actions
end

When('I select the option to register') do
  pending # Write code here that turns the phrase above into concrete actions
end

Then('student with email {string} is not enrolled in course offering for course with code {string} with section {string}') do |_string, _string2, _string3|
  pending # Write code here that turns the phrase above into concrete actions
end
