# frozen_string_literal: true

Then('I receive a message saying {string}') do |message|
  assert_text message
end

Then('user with email {string} has status {string}') do |string, string2|
  pending # Write code here that turns the phrase above into concrete actions
end
