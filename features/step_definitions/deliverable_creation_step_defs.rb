# frozen_string_literal: true
When('I enter deliverable title {string}') do |string|
  fill_in('deliverable_title_field', with: string)
end

When('I enter deliverable description {string}') do |string|
  fill_in('deliverable_description_field', with: string)
end

When('I enter deliverable weight {string}') do |string|
  fill_in('deliverable_weight_field', with: string)
end

When('I enter deliverable due date {string}') do |string|
  fill_in('deliverable_due_date_field', with: string)
end

Then('there exists a deliverable with title {string} with the description {string}') do |title, description|
  assert_text title
  assert_text description
end
