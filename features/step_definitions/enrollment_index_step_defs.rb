Given('student with email {string} has an account balance of {int}') do |string, int|
  User.find_by(email: string).update(balance: 1000)
end

Given('there exists a term with per credit fee {float} withdrawal deadline later than today') do |float|
  today = Date.today
  @term = Term.create!(
    start_date: today + 14,
    end_date: today + 130,
    registration_deadline: today + 30,
    withdrawal_deadline: today + 50,
    per_credit_fee: float,
  )
end

Given('there exists a term with per credit fee {float} withdrawal deadline earlier than today') do |float|
  today = Date.today
  @term = Term.create!(
    start_date: today - 60,
    end_date: today + 60,
    registration_deadline: today - 45,
    withdrawal_deadline: today - 20,
    per_credit_fee: float,
  )
end

 Given('student with email {string} is enrolled in course with code {string} section {string}') do |string, string2, string3|
  user = User.find_by(email: string)
  course = Course.find_by(code: string2)
  offering = Offering.find_by(course: course, term: @term, section: string3)
  @enrollment = Enrollment.create(user: user, offering: offering, role: "student")
 end



Given('student with email {string} has received a final grade in the enrollment') do |string|
  @enrollment.update(final_grade: "B")
end

Given('I am viewing enrollments for student with email {string}') do |string|
  visit('/courses')
end

When('I click the unenroll button') do
  button = find('#unenroll_button')
  button.click
end

Then('enrollment in course with code {string} section {string} no longer appears in my enrollments') do |string, string2|
  assert has_no_text?("#{string} #{string2}")
end

Then('enrollment in course with code {string} section {string} still appears in my enrollments') do |string, string2|
  assert has_text?("#{string} #{string2}")
end

Then('there is no unenroll button') do
  assert has_no_button?("unenroll_button")
end
