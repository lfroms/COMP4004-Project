# frozen_string_literal: true

When('I fill field {string} in with {string}') do |id, value|
  fill_in(id, with: value)
end
