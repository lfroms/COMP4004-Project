# frozen_string_literal: true
Then('there does not exists a course offering for course with code {string} with section {string} and term {string}') do |string, string2, string3| # rubocop:disable Layout/LineLength
  refute session.has_content?(string)
  refute session.has_content?(string2)
  refute session.has_content?(string3)
end
