# frozen_string_literal: true

When('I enter code {string}') do |code|
  fill_in('course_code_field', with: code)
end

When('I enter name {string}') do |name|
  fill_in('course_name_field', with: name)
end

When('I select prerequisite {string}') do |prerequisite|
  find('#course_prerequisites_field', visible: false).click
  find('.prerequisite_option', text: prerequisite).click
end
