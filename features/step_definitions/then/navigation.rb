# frozen_string_literal: true

Then('I get redirected to courses') do
  assert_current_path '/courses'
end
