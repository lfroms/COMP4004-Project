# frozen_string_literal: true
require 'test_helper'

class CourseTest < ActiveSupport::TestCase
  test 'course can be created with valid name and code' do
    course = Course.new(name: 'Software Quality Assurance', code: 'COMP 1928')

    assert course.valid?
  end

  test 'course cannot be created if name is missing' do
    course = Course.new(code: 'COMP 3523')

    assert_not course.valid?
  end

  test 'course cannot be created if code is missing' do
    course = Course.new(name: 'Software Quality Assurance')

    assert_not course.valid?
  end

  test 'course is invalid if name does not match XXXX 0000' do
    course = Course.new(name: 'Software Quality Assurance', code: 'A1B2C3')

    assert_not course.valid?
  end

  test 'course is invalid if code already taken' do
    Course.create!(name: 'Software Quality Assurance', code: 'COMP 1234')
    course = Course.new(name: 'Software Quality Assurance 2', code: 'COMP 1234')

    assert_not course.valid?
  end
end
