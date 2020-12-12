# frozen_string_literal: true

Given('there exists a user with email {string}') do |email|
  User.create(name: 'Existant User', email: email, password: '123456')
end

Given('there exists a user with email {string} and approved status {string}') do |email, approved_string|
  approved = approved_string == 'true' ? true : false
  User.create!(name: 'Not Approved', email: email, password: '123456', approved: approved)
end

Given('there exists a user with email {string} password {string} approved status {string}') do |email, password, approved_string|
  approved = approved_string == 'true' ? true : false
  User.create(name: 'Not Approved', email: email, password: password, approved: approved)
end

Given('there exists a user with email {string} name {string}') do |email, name|
  User.create(name: name, email: email, password: '123456', approved: true)
end
