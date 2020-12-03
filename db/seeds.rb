# frozen_string_literal: true
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

User.create!(name: 'Super Admin', email: 'admin@example.com', password: '123456', admin: true, approved: true)
User.create!(name: 'Standard User', email: 'standard@example.com', password: '123456', admin: false, approved: true)
User.create!(name: 'Pending User', email: 'pending@example.com', password: '123456', admin: false, approved: false)
self_enrolling_user = User.create!(name: 'Self-Enrolling User', email: 'selfenroll@example.com', password: '123456', admin: false, approved: true)

self_enrolling_group = Group.create!(name: 'Self-enrolling users', can_self_enroll: true)
self_enrolling_group.users << self_enrolling_user

term_one = Term.create!(
  start_date: Time.zone.local(2020, 9, 1, 0, 0, 0),
  end_date: Time.zone.local(2020, 12, 15, 0, 0, 0),
  registration_deadline: Time.zone.local(2020, 9, 1, 0, 0, 0),
  withdrawal_deadline: Time.zone.local(2020, 10, 1, 0, 0, 0),
  financial_deadline: Time.zone.local(2020, 9, 30, 0, 0, 0),
)

term_two = Term.create!(
  start_date: Time.zone.local(2021, 1, 6, 0, 0, 0),
  end_date: Time.zone.local(2021, 4, 15, 0, 0, 0),
  registration_deadline: Time.zone.local(2021, 1, 13, 0, 0, 0),
  withdrawal_deadline: Time.zone.local(2021, 3, 20, 0, 0, 0),
  financial_deadline: Time.zone.local(2021, 1, 24, 0, 0, 0),
)

quality_assurance_course = Course.create!(name: 'Software Quality Assurance', code: 'COMP 4004')
object_oriented_course = Course.create!(name: 'Object-Oriented Software Engineering', code: 'COMP 3004')
popular_music_course = Course.create!(name: 'Issues in Popular Music', code: 'MUSI 1002')
evolution_earth_course = Course.create!(name: 'Evolution of the Earth', code: 'ERTH 1011')
natural_disasters_course = Course.create!(name: 'Natural Disasters', code: 'ERTH 2415')
computer_music_course = Course.create!(name: 'Computer Music Projects', code: 'MUSI 3604')

quality_assurance_course.prerequisites << object_oriented_course
natural_disasters_course.prerequisites << evolution_earth_course

Offering.create!(section: 'A', course: quality_assurance_course, term: term_one)
Offering.create!(section: 'A', course: quality_assurance_course, term: term_two)
Offering.create!(section: 'B', course: quality_assurance_course, term: term_two)

Offering.create!(section: 'A', course: object_oriented_course, term: term_one)
Offering.create!(section: 'B', course: object_oriented_course, term: term_one)
Offering.create!(section: 'A', course: object_oriented_course, term: term_two)

Offering.create!(section: 'A', course: popular_music_course, term: term_one)
Offering.create!(section: 'A', course: popular_music_course, term: term_two)

Offering.create!(section: 'V', course: natural_disasters_course, term: term_one)
Offering.create!(section: 'A', course: natural_disasters_course, term: term_two)
Offering.create!(section: 'B', course: natural_disasters_course, term: term_two)

Offering.create!(section: 'A', course: computer_music_course, term: term_one)
Offering.create!(section: 'A', course: computer_music_course, term: term_two)
Offering.create!(section: 'V', course: computer_music_course, term: term_two)

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
