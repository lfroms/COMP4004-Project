# frozen_string_literal: true

When('I click the approve button next to the user with email {string}') do |email|
  user_id = User.find_by(email: email).id
  find("#approve_user_id_#{user_id}").click
end
