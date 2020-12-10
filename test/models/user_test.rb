# frozen_string_literal: true
require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'user can be created with params' do
    user = User.new(name: 'Lukas', email: 'example@example.com', password: '123456', admin: true, approved: true)

    assert user.valid?
  end

  test 'name cannot be empty' do
    user = User.new(name: nil, email: 'lukas@romsicki.com', password: '123456', admin: true, approved: true)

    assert_not user.valid?
  end

  test 'email cannot be empty' do
    user = User.new(name: 'Lukas', email: nil, password: '123456', admin: true, approved: true)

    assert_not user.valid?
  end

  test 'default balance is 0' do
    user = User.new(name: 'Lukas', email: 'example@example.com', password: '123456', admin: true, approved: true)

    assert_equal 0, user.balance
  end

  test 'email must be valid' do
    user = User.new(name: 'Lukas', email: 'test.con', password: '123456', admin: true, approved: true)

    assert_not user.valid?
  end

  test 'email must be unique' do
    User.create!(name: 'Lukas', email: 'example@example.com', password: '123456', admin: true, approved: true)

    assert_raises ActiveRecord::RecordInvalid do
      User.create!(name: 'Gaby', email: 'example@example.com', password: 'funkyMunky', admin: true, approved: true)
    end
  end

  test 'password cannot be empty' do
    user = User.new(name: 'Lukas', email: 'example@example.com', password: nil, admin: true, approved: true)

    assert_not user.valid?
  end

  test 'password must be of minimum length 6' do
    user = User.new(name: 'Lukas', email: 'example@example.com', password: '12', admin: true, approved: true)

    assert_not user.valid?
  end
end
