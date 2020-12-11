# frozen_string_literal: true

Given('I am on the course offering index') do
  visit('admin/offerings')
end

Given('there exists a term {string}') do |string|
  dates = string.split(' - ')
  @term = Term.create!(
    start_date: Time.zone.parse(dates.first),
    end_date: Time.zone.parse(dates.last),
    registration_deadline: Time.zone.parse(dates.first),
    withdrawal_deadline: Time.zone.parse(dates.first) + 5,
    per_credit_fee: 1000,
  )
end

Given('the current term is {string}') do |string|
  dates = string.split(' - ')
  @term = Term.create!(
    start_date: Time.zone.parse(dates.first),
    end_date: Time.zone.parse(dates.last),
    registration_deadline: Time.zone.parse(dates.first),
    withdrawal_deadline: Time.zone.parse(dates.first) + 5,
    per_credit_fee: 1000,
  )
end

Given('the current term has per credit fee {float} withdrawal deadline later than today') do |float|
  today = Time.zone.today
  @term = Term.create!(
    start_date: today + 14,
    end_date: today + 130,
    registration_deadline: today + 30,
    withdrawal_deadline: today + 50,
    per_credit_fee: float,
  )
end

Given('the current term has per credit fee {float} withdrawal deadline earlier than today') do |float|
  today = Time.zone.today
  @term = Term.create!(
    start_date: today - 60,
    end_date: today + 60,
    registration_deadline: today - 45,
    withdrawal_deadline: today - 20,
    per_credit_fee: float,
  )
end

Given('the current term has per credit fee {float} registration deadline later than today') do |float|
  today = Time.zone.today
  @term = Term.create!(
    start_date: today + 14,
    end_date: today + 130,
    registration_deadline: today + 30,
    withdrawal_deadline: today + 50,
    per_credit_fee: float,
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

Given('student with email {string} has failed course with code {string}') do |string, string2|
  user = User.find_by(email: string)
  course = Course.find_by(code: string2)
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

Given('user with email {string} is the professor for course offering for course with code {string} with section {string} and term {string}') do |email, code, section, _term|
  prof = User.find_by(email: email)
  course = Course.find_by(code: code)
  offering = Offering.find_by(section: section, course_id: course.id, term_id: @term.id)

  Enrollment.create!(role: 'professor', offering: offering, user: prof)
end

Given('I am viewing the deliverable creation form for course offering for course with code {string} with section {string} and term {string}') do |code, section, _term|
  course = Course.find_by(code: code)
  offering = Offering.find_by(course_id: course.id, section: section)

  visit("/courses/#{offering.id}")
  click_button('add_deliverable_button')
end

Given('there exists a user with email {string} name {string}') do |string, string2|
  User.create(name: string2, email: string, password: "123456", approved: true)
end

When('I enter section {string}') do |string|
  fill_in('offering_section_field', with: string)
end

When('I enter capacity {int}') do |int|
  field = find('.ant-input-number-input')
  field.fill_in(with: int)
end

When('I select course {string}') do |string|
  pending
  # find('#offering_course_select', visible: false).click
  # find('.offering_form_course_option', text: string).click
end

When('I select term {string}') do |string|
  find('#offering_term_select', visible: false).click
  find('.offering_form_term_option', text: string).click
end

When('I click the delete offering button') do
  click_button('delete_offering')
end

When('I visit the show page for for course with code {string} section {string} for the current term') do |string, string2|
  course = Course.find_by(code: string)
  offering_id = Offering.find_by(course: course, section: string2, term: @term).id
  visit("admin/offerings/#{offering_id}")
end

When('I select the user with name {string}') do |string|
  find('input', text: 'Select a professor').click
  find('.ant-select-item', text: "#{string}").click
end

Then('there now exists a course offering for course with code {string} section {string} term {string}') do |string, string2, string3|
  index = find('#offering_index')              # from Capybara::Node::Finders
  assert index.has_content?(string)
  assert index.has_content?(string2)
  assert index.has_content?(string3)
end

Then('there no longer exists a course offering for course with code {string} section {string} term {string}') do |string, string2, string3|
  index = find('#offering_index')              # from Capybara::Node::Finders
  refute index.has_content?(string)
  refute index.has_content?(string2)
  refute index.has_content?(string3)
end

Then('there still exists a course offering for course with code {string} section {string} term {string}') do |string, string2, string3|
  index = find('#offering_index')              # from Capybara::Node::Finders
  assert index.has_content?(string)
  assert index.has_content?(string2)
  assert index.has_content?(string3)
end

Then('there are no enroll buttons') do
  assert has_no_button?('enroll_button')
end

Then('the professor for the course offering has name {string}') do |string|
  assert_text string
end
