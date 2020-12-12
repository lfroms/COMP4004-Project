# frozen_string_literal: true

Then('I get redirected to courses') do
  assert_current_path '/courses'
end

Then('I get redirected to the show page for course with code {string} section {string}') do |code, section|
  course = Course.find_by(code: code)
  offering = Offering.find_by(course: course, section: section, term: @term)

  assert_current_path "/courses/#{offering.id}"
end

Then('I get redirected to the login page') do
  assert_current_path '/login'
end
