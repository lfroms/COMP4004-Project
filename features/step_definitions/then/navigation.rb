# frozen_string_literal: true

Then('I get redirected to the courses page') do
  assert_current_path '/courses'
end
