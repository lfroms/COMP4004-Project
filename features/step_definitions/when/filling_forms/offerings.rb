# frozen_string_literal: true

When('I enter section {string}') do |section|
  fill_in('offering_section_field', with: section)
end

When('I enter capacity {int}') do |capacity|
  field = find('.ant-input-number-input')
  field.fill_in(with: capacity)
end

When('I select course {string}') do |course|
  find('#offering_course_select', visible: false).click
  find('.offering_form_course_option', text: course).click
end

When('I select term {string}') do |term|
  find('#offering_term_select', visible: false).click
  find('.offering_form_term_option', text: term).click
end

When('I enter grade {string}') do |grade|
  find('#final_grade_select', visible: false).click
  find(".final_grade_select_#{grade}", text: grade).click
end
