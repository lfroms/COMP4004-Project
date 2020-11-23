# frozen_string_literal: true
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(name: 'Jane', email: 'jane@email.com', password: '123456', admin: true, approved: true)
puts "Created #{User.count} user(s)"
term = Term.create!(
  start_date: Time.zone.local(2020, 9, 1, 4, 5, 6),
  end_date: Time.zone.local(2020, 12, 15, 4, 5, 6),
  registration_deadline: Time.zone.local(2020, 9, 1, 4, 5, 6),
  withdrawal_deadline: Time.zone.local(2020, 10, 1, 4, 5, 6),
  financial_deadline: Time.zone.local(2020, 9, 30, 4, 5, 6),
)
course = Course.create!(name: 'Software Quality Assurance', code: 'COMP 4004')
Offering.create!(section: 'A', course: course, term: term)
