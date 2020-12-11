# frozen_string_literal: true
When('a student with email {string} has created a submission {string} for deliverable {string} for course offering {string} section {string}') do |string, string2, string3, string4, string5|
  user = User.create!(name: 'rob', password: '123456', email: string, admin: false, approved: true)
  course = Course.find_by(code: string4)
  offering = Offering.find_by(course: course, section: string5)
  Enrollment.create!(user: user, offering: offering, role: 'student')

  deliverable = Deliverable.find_by(title: string3)
  Submission.create!(user: user, deliverable: deliverable, attachment_url: string2)
end

When('I navigate to the deliverable show page for the {string}') do |string|
  deliverable = Deliverable.find_by(title: string)
  visit("/courses/#{deliverable.offering_id}/deliverables/#{deliverable.id}")
end

When('I enter a grade of {string}') do |string|
  fill_in('grade_value_field', with: string)
end

When('I enter a comment saying {string}') do |string|
  fill_in('grade_comment_field', with: string)
end

Then('there exists a graded submission with grade {string}% and attachment url {string}') do |string, string2|
  assert_text "#{string} / 100"
  assert_text string2
end
