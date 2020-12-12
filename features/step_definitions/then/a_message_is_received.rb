# frozen_string_literal: true

Then('I receive a message saying {string}') do |message|
  assert_text message
end
