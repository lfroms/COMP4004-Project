# frozen_string_literal: true

When('I enter code {string}') do |code|
  fill_in('course_code_field', with: code)
end

When('I enter name {string}') do |name|
  fill_in('course_name_field', with: name)
end

When('I select prerequisite {string}') do |prerequisite|
  find('span', text: 'Prerequisites').click
  find('.ant-select-item', text: prerequisite.to_s).click
end
