# frozen_string_literal: true

When('I enter deliverable title {string}') do |title|
  fill_in('deliverable_title_field', with: title)
end

When('I enter deliverable description {string}') do |description|
  fill_in('deliverable_description_field', with: description)
end

When('I enter deliverable weight {string}') do |weight|
  fill_in('deliverable_weight_field', with: weight)
end

When('I enter deliverable due date {string}') do |due_date|
  fill_in('deliverable_due_date_field', with: due_date)
end
