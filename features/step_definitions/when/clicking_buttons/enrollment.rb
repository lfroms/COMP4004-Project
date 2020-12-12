# frozen_string_literal: true

When('I click the enroll button') do
  click_button('enroll_button')
end

When('I click the unenroll button') do
  button = find('#unenroll_button')
  button.click
end
