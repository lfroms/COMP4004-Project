# frozen_string_literal: true

When('I select the user with name {string}') do |name|
  find('input', text: 'Select a professor').click
  find('.ant-select-item', text: name.to_s).click
end
