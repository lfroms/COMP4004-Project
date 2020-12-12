# frozen_string_literal: true

When('I select the user with name {string}') do |text|
  find('#assign_professor_select', visible: false).click
  find('.assign_professor_option', text: text).click
end
