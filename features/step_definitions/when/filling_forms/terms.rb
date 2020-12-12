# frozen_string_literal: true

When('I select start date {string} and end date {string}') do |start_date, end_date|
  fill_in('Start date', with: start_date)
  fill_in('End date', with: end_date)
end

When('I select start date {string}') do |string|
  fill_in('Start date', with: string)
end

When('I select end date {string}') do |string|
  fill_in('End date', with: string)
end

When('I select registration deadline {string}') do |deadline|
  fill_in('term_registration_deadline_field', with: deadline)
end

When('I select withdrawal deadline {string}') do |deadline|
  fill_in('term_withdrawal_deadline_field', with: deadline)
end

When('I enter per credit fee {string}') do |fee|
  fill_in('term_fee_field', with: fee)
end
