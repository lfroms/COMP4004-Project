# frozen_string_literal: true

When('I click the enroll button next to course code {string} section {string}') do |code, section|
  course = Course.find_by(code: code)
  offering = Offering.find_by(course: course, section: section, term: @term)
  click_button("enroll_button_#{offering.id}")
end

When('I click the unenroll button') do
  button = find('#unenroll_button')
  button.click
end
