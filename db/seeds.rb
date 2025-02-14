# frozen_string_literal: true
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

admin = User.create!(name: 'Super Admin', email: 'admin@example.com', password: '123456', admin: true, approved: true)
standard_user = User.create!(name: 'Standard User', email: 'standard@example.com', password: '123456', admin: false, approved: true)
User.create!(name: 'Pending User', email: 'pending@example.com', password: '123456', admin: false, approved: false)
self_enrolling_user = User.create!(name: 'Self-Enrolling User', email: 'selfenroll@example.com', password: '123456', admin: false, approved: true)

self_enrolling_group = Group.create!(name: 'Self-enrolling users', can_self_enroll: true)
self_enrolling_group.users << self_enrolling_user
self_enrolling_group.users << standard_user

term_one = Term.create!(
  start_date: Time.zone.local(2020, 9, 1, 0, 0, 0),
  end_date: Time.zone.local(2020, 12, 15, 0, 0, 0),
  registration_deadline: Time.zone.local(2020, 9, 1, 0, 0, 0),
  withdrawal_deadline: Time.zone.local(2020, 10, 1, 0, 0, 0),
  per_credit_fee: 1000.00,
)

term_two = Term.create!(
  start_date: Time.zone.local(2021, 1, 6, 0, 0, 0),
  end_date: Time.zone.local(2021, 4, 15, 0, 0, 0),
  registration_deadline: Time.zone.local(2021, 1, 13, 0, 0, 0),
  withdrawal_deadline: Time.zone.local(2021, 3, 20, 0, 0, 0),
  per_credit_fee: 1000.00,
)

quality_assurance_course = Course.create!(name: 'Software Quality Assurance', code: 'COMP 4004')
object_oriented_course = Course.create!(name: 'Object-Oriented Software Engineering', code: 'COMP 3004')
popular_music_course = Course.create!(name: 'Issues in Popular Music', code: 'MUSI 1002')
evolution_earth_course = Course.create!(name: 'Evolution of the Earth', code: 'ERTH 1011')
natural_disasters_course = Course.create!(name: 'Natural Disasters', code: 'ERTH 2415')
computer_music_course = Course.create!(name: 'Computer Music Projects', code: 'MUSI 3604')
film_course = Course.create!(name: 'Intro to Film', code: 'FILM 1001')
first_psych_course = Course.create!(name: 'Intro to Psychology', code: 'PYSC 1001')
second_psych_course = Course.create!(name: 'More Psychology', code: 'PSYC 2001')

quality_assurance_course.prerequisites << object_oriented_course
natural_disasters_course.prerequisites << evolution_earth_course
second_psych_course.prerequisites << first_psych_course

Offering.create!(section: 'A', capacity: 100, course: quality_assurance_course, term: term_one)
Offering.create!(section: 'A', capacity: 150, course: quality_assurance_course, term: term_two)
Offering.create!(section: 'B', capacity: 220, course: quality_assurance_course, term: term_two)

Offering.create!(section: 'A', capacity: 300, course: object_oriented_course, term: term_one)
Offering.create!(section: 'B', capacity: 150, course: object_oriented_course, term: term_one)
Offering.create!(section: 'A', capacity: 100, course: object_oriented_course, term: term_two)

Offering.create!(section: 'A', capacity: 1, course: popular_music_course, term: term_one)
Offering.create!(section: 'A', capacity: 160, course: popular_music_course, term: term_two)

Offering.create!(section: 'V', capacity: 315, course: natural_disasters_course, term: term_one)
Offering.create!(section: 'A', capacity: 175, course: natural_disasters_course, term: term_two)
Offering.create!(section: 'B', capacity: 100, course: natural_disasters_course, term: term_two)

Offering.create!(section: 'A', capacity: 210, course: computer_music_course, term: term_one)
Offering.create!(section: 'A', capacity: 150, course: computer_music_course, term: term_two)
Offering.create!(section: 'V', capacity: 150, course: computer_music_course, term: term_two)

Offering.all.each do |offering|
  3.times do
    Deliverable.create!(
      offering: offering,
      title: Faker::Mountain.name,
      description: Faker::Hacker.say_something_smart,
      weight: rand * (1.0-0.0) + 0.0,
      due_date: Faker::Date.between(from: offering.term.start_date, to: offering.term.end_date)
    )
  end
end

self_enrolling_group.users.each do |user|
  Offering.all.sample(5).each do |offering|
    if offering.course.prerequisites.empty?
      Enrollment.create(offering: offering, user: user, role: 'student')
    end
  end
end

Offering.all.sample(5).each do |offering|
  Enrollment.create(offering: offering, user: admin, role: 'professor')
end

self_enrolling_group.users.each do |user|
  user.enrollments.each do |enrollment|
    enrollment.offering.deliverables.each do |deliverable|
      Submission.create(user: user, deliverable: deliverable, attachment_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf')
    end
  end
end

low_capacity_offering = Offering.create!(section: 'A', capacity: 1, course: film_course, term: term_two)
prerequisite_offering = Offering.create!(section: 'A', capacity: 200, course: first_psych_course, term: term_one)
course_with_prereq_offering = Offering.create!(section: 'A', capacity: 200, course: second_psych_course, term: term_two)
Enrollment.create(offering: low_capacity_offering, user: standard_user, role: 'student')


