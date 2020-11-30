# frozen_string_literal: true
Then('there does not exists a course with code {string}') do |string|
  refute session.has_content?(string)
end
