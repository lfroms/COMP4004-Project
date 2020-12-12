# frozen_string_literal: true

When('I click the register button') do
  button = find('#register_button')
  button.click
end

When('I click the approve button for user with email {string}') do |string|
  pending
end
