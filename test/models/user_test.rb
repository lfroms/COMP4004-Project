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

  test 'fees correctly calculates amount owed' do
    fall_fee = terms(:fall).per_credit_fee
    future_fee = terms(:future).per_credit_fee

    assert_equal (4 * fall_fee + future_fee), users(:not_admin).fees
    assert_equal 0, users(:bob).fees
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
