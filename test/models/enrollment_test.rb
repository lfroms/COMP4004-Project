# frozen_string_literal: true
require 'test_helper'

class EnrollmentTest < ActiveSupport::TestCase
  test 'enrollment can be created with valid role, user, and offering' do
    enrollment = Enrollment.new(role: 'student', offering: offerings(:object_oriented_section_a), user: users(:sally))

    assert enrollment.valid?
  end

  test 'enrollment cannot be created if role is missing' do
    enrollment = Enrollment.new(offering: offerings(:object_oriented_section_a), user: users(:sally))

    assert_not enrollment.valid?
  end

  test 'enrollment cannot be created if offering is missing' do
    enrollment = Enrollment.new(role: 'professor', user: users(:sally))

    assert_not enrollment.valid?
  end

  test 'enrollment cannot be created if user is missing' do
    enrollment = Enrollment.new(role: 'student', offering: offerings(:object_oriented_section_a))

    assert_not enrollment.valid?
  end

  test 'enrollment cannot be created if role is not valid' do
    assert_raises ArgumentError do
      Enrollment.new(role: 'guest', offering: offerings(:object_oriented_section_a), user: users(:sally))
    end
  end

  test 'enrollment cannot be created if offering does not exist' do
    enrollment = Enrollment.new(role: 'student', offering_id: Offering.last.id + 1, user: users(:sally))

    assert_not enrollment.valid?
  end

  test 'enrollment cannot be created if user does not exist' do
    enrollment = Enrollment.new(
      role: 'student',
      offering: offerings(:object_oriented_section_a),
      user_id: User.last.id + 1
    )

    assert_not enrollment.valid?
  end

  test 'enrollment cannot be created if offering is at maximum capacity' do
    offering = Offering.create(section: 'C', course: courses(:quality_assurance), term: terms(:fall), capacity: 1)

    Enrollment.create(role: 'student', offering: offering, user: users(:sally))
    enrollment = Enrollment.new(role: 'student', offering: offering, user: users(:not_admin))

    assert_not enrollment.valid?
  end

  test 'enrollment cannot be created if user is already enrolled in offering' do
    student = enrollments(:student)
    enrollment1 = Enrollment.new(role: student.role, offering: student.offering, user: student.user)
    enrollment2 = Enrollment.new(role: 'professor', offering: student.offering, user: student.user)

    assert_not enrollment1.valid?
    assert_not enrollment2.valid?
  end

  test 'enrollment can be updated with a valid grade' do
    enrollment = Enrollment.create(
      role: 'student',
      offering: offerings(:object_oriented_section_a),
      user: users(:sally)
    )
    enrollment.update(final_grade: 'A')
    assert enrollment.valid?
  end

  test 'enrollment cannot be created with an invalid grade' do
    enrollment = Enrollment.new(role: 'student', offering: offerings(:object_oriented_section_a), user: users(:sally))
    enrollment.update(final_grade: 'E')
    assert_not enrollment.valid?
  end

  test 'enrollment can identify a passing grade' do
    enrollment1 = Enrollment.new(
      role: 'student',
      offering: offerings(:object_oriented_section_a),
      user: users(:sally), final_grade: 'D-'
    )
    enrollment2 = Enrollment.new(
      role: 'student',
      offering: offerings(:quality_assurance_section_a),
      user: users(:sally), final_grade: 'WDN'
    )
    enrollment3 = Enrollment.new(
      role: 'student',
      offering: offerings(:object_oriented_section_a),
      user: users(:not_admin)
    )
    enrollment4 = Enrollment.new(
      role: 'student',
      offering: offerings(:just_another_course_A),
      user: users(:sally), final_grade: 'F'
    )

    assert enrollment1.passed?
    assert_not enrollment2.passed?
    assert_not enrollment3.passed?
    assert_not enrollment4.passed?
  end
end
