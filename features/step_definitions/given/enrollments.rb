# frozen_string_literal: true

Given('student with email {string} is enrolled in course with code {string} section {string}') do |email, course, section|
  user = User.find_by(email: email)
  course = Course.find_by(code: course)
  offering = Offering.find_by(course: course, term: @term, section: section)
  @enrollment = Enrollment.create(user: user, offering: offering, role: 'student')
end

Given('a student is already enrolled in course offering with code {string} section {string}') do |code, section|
  course = Course.find_by(code: code)
  offering = Offering.find_by(course: course, section: section, term: @term)
  user = User.create(name: 'Other User', email: 'other@email.com', password: '123456')
  group = Group.create!(name: 'more self-enrolling users', can_self_enroll: true)
  group.users << user
  Enrollment.create(offering: offering, user: user, role: 'student')
end

Given('student with email {string} is enrolled in course offering with code {string} section {string} for the current term') do |email, code, section|
  course = Course.find_by(code: code)
  offering = Offering.find_by(course: course, section: section, term: @term)
  user = User.create(name: 'Other User', email: email, password: '123456')
  group = Group.create!(name: 'more self-enrolling users', can_self_enroll: true)
  group.users << user
  Enrollment.create(offering: offering, user: user, role: 'student')
end

Given('student with email {string} is already enrolled in course with code {string} section {string}') do |email, code, section|
  course = Course.find_by(code: code)
  offering = Offering.find_by(course: course, section: section)
  user = User.find_by(email: email)
  Enrollment.create(offering: offering, user: user, role: 'student')
end

# TODO: This step definition should not be creating terms.
Given('student with email {string} has passed course with code {string}') do |email, code|
  term = Term.create!(
    start_date: Time.zone.local(2018, 9, 1, 4, 5, 6),
    end_date: Time.zone.local(2018, 12, 31, 4, 5, 6),
    registration_deadline: Time.zone.local(2018, 9, 1, 4, 5, 6),
    withdrawal_deadline: Time.zone.local(2018, 10, 1, 4, 5, 6),
  )

  user = User.find_by(email: email)
  course = Course.find_by(code: code)
  offering = Offering.create!(section: 'A', course: course, term: term, capacity: 100)
  Enrollment.create!(offering: offering, user: user, role: 'student', final_grade: 'A')
end

# TODO: Remove email argument.
Given('student with email {string} has received a final grade in the enrollment') do |_string|
  @enrollment.update(final_grade: 'B')
end

Given('user with email {string} is the professor for course offering for course with code {string} with section {string} and term {string}') do |email, code, section, _term|
  prof = User.find_by(email: email)
  course = Course.find_by(code: code)
  offering = Offering.find_by(section: section, course_id: course.id, term_id: @term.id)

  Enrollment.create!(role: 'professor', offering: offering, user: prof)
end
