# frozen_string_literal: true
require 'test_helper'

class EnrollmentTest < ActiveSupport::TestCase
  test 'enrollment can be created with valid role, user, and offering' do
    enrollment = Enrollment.new(role: 'student', offering: offerings(:quality_assurance_B), user: users(:not_admin))

    assert enrollment.valid?
  end

  test 'enrollment cannot be created if role is missing' do
    enrollment = Enrollment.new(offering: offerings(:quality_assurance_A), user: users(:not_admin))

    assert_not enrollment.valid?
  end

  test 'enrollment cannot be created if offering is missing' do
    enrollment = Enrollment.new(role: 'professor', user: users(:not_admin))

    assert_not enrollment.valid?
  end

  test 'enrollment cannot be created if user is missing' do
    enrollment = Enrollment.new(role: 'student', offering: offerings(:quality_assurance_A))

    assert_not enrollment.valid?
  end

  test 'enrollment cannot be created if role is not valid' do
    assert_raises ArgumentError do
      Enrollment.new(role: 'guest', offering: offerings(:quality_assurance_A), user: users(:not_admin))
    end
  end

  test 'enrollment cannot be created if offering does not exist' do
    enrollment = Enrollment.new(role: 'student', offering_id: Offering.last.id + 1, user: users(:not_admin))

    assert_not enrollment.valid?
  end

  test 'enrollment cannot be created if user does not exist' do
    enrollment = Enrollment.new(role: 'student', offering: offerings(:quality_assurance_A), user_id: User.last.id + 1)

    assert_not enrollment.valid?
  end

  test 'enrollment cannot be created if offering is at maximum capacity' do
    offering = Offering.create(section: 'C', course: courses(:quality_assurance), term: terms(:one), capacity: 1)

    Enrollment.create(role: 'student', offering: offering, user: users(:not_admin))
    enrollment = Enrollment.new(role: 'student', offering: offering, user: users(:not_admin2))

    assert_not enrollment.valid?
  end

  test 'enrollment cannot be created if user is already enrolled in offering' do
    student = enrollments(:student)
    enrollment1 = Enrollment.new(role: student.role, offering: student.offering, user: student.user)
    enrollment2 = Enrollment.new(role: 'professor', offering: student.offering, user: student.user)

    assert_not enrollment1.valid?
    assert_not enrollment2.valid?
  end
end
