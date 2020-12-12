# frozen_string_literal: true

When('a student with email {string} has created a submission {string} for deliverable {string} for course offering {string} section {string}') do |email, attachment_url, title, code, section|
  user = User.create!(name: 'rob', password: '123456', email: email, admin: false, approved: true)
  course = Course.find_by(code: code)
  offering = Offering.find_by(course: course, section: section, term: @term)
  Enrollment.create!(user: user, offering: offering, role: 'student')

  deliverable = Deliverable.find_by(title: title)
  Submission.create!(user: user, deliverable: deliverable, attachment_url: attachment_url)
end
