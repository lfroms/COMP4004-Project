# frozen_string_literal: true

Given('there exists a term {string}') do |name|
  dates = name.split(' - ')
  @term = Term.create!(
    start_date: Time.zone.parse(dates.first),
    end_date: Time.zone.parse(dates.last),
    registration_deadline: Time.zone.parse(dates.first),
    withdrawal_deadline: Time.zone.parse(dates.first) + 5,
    per_credit_fee: 1000,
  )
end

Given('the current term is {string}') do |name|
  dates = name.split(' - ')
  @term = Term.create!(
    start_date: Time.zone.parse(dates.first),
    end_date: Time.zone.parse(dates.last),
    registration_deadline: Time.zone.parse(dates.first),
    withdrawal_deadline: Time.zone.parse(dates.first) + 5,
    per_credit_fee: 1000,
  )
end

Given('the current term has per credit fee {float} withdrawal deadline later than today') do |fee|
  today = Time.zone.today
  @term = Term.create!(
    start_date: today + 14,
    end_date: today + 130,
    registration_deadline: today + 30,
    withdrawal_deadline: today + 50,
    per_credit_fee: fee,
  )
end

Given('the current term has per credit fee {float} withdrawal deadline earlier than today') do |fee|
  today = Time.zone.today
  @term = Term.create!(
    start_date: today - 60,
    end_date: today + 60,
    registration_deadline: today - 45,
    withdrawal_deadline: today - 20,
    per_credit_fee: fee,
  )
end

Given('the current term has per credit fee {float} registration deadline later than today') do |fee|
  today = Time.zone.today
  @term = Term.create!(
    start_date: today + 14,
    end_date: today + 130,
    registration_deadline: today + 30,
    withdrawal_deadline: today + 50,
    per_credit_fee: fee,
  )
end

Given('the current term has registration deadline earlier than today') do
  today = Time.zone.today
  @term = Term.create!(
    start_date: today - 60,
    end_date: today + 60,
    registration_deadline: today - 45,
    withdrawal_deadline: today - 20,
  )
end

Given('student with email {string} has failed course with code {string}') do |email, code|
  user = User.find_by(email: email)
  course = Course.find_by(code: code)
  today = Time.zone.today
  term = Term.create!(
    start_date: today - 150,
    end_date: today - 30,
    registration_deadline: today - 130,
    withdrawal_deadline: today - 100,
    per_credit_fee: 1000,
  )
  offering = Offering.create(course: course, term: term, section: 'A', capacity: 100)
  Enrollment.create(user: user, offering: offering, role: 'student', final_grade: 'F')
end
