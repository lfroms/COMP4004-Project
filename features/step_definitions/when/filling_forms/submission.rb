# frozen_string_literal: true

When('I enter url {string}') do |url|
  fill_in('submission_url_field', with: url)
end
