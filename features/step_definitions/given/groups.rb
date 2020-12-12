# frozen_string_literal: true

## SELF-ENROLLING ###

Given('student with email {string} is a self-enrolling user') do |email|
  user = User.find_by(email: email)
  group = Group.create!(name: 'Self-enrolling users', can_self_enroll: true)
  group.users << user
end
