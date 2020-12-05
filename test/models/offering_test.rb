# frozen_string_literal: true
require 'test_helper'

class OfferingTest < ActiveSupport::TestCase
  test 'offering can be created with valid section, course, term, and capacity' do
    offering = Offering.new(section: 'C', course: courses(:quality_assurance), term: terms(:one), capacity: 100)

    assert offering.valid?
  end

  test 'offering cannot be created if section is missing' do
    offering = Offering.new(course: courses(:quality_assurance), term: terms(:one), capacity: 100)

    assert_not offering.valid?
  end

  test 'offering cannot be created if course is missing' do
    offering = Offering.new(section: 'C', term: terms(:one), capacity: 100)

    assert_not offering.valid?
  end

  test 'offering cannot be created if term is missing' do
    offering = Offering.new(section: 'C', course: courses(:quality_assurance), capacity: 100)

    assert_not offering.valid?
  end

  test 'offering cannot be created if section is not a letter' do
    offering = Offering.new(section: 'ABC', course: courses(:quality_assurance), term: terms(:one), capacity: 100)

    assert_not offering.valid?
  end

  test 'offering cannot be created if capacity is less than 1' do
    offering = Offering.new(section: 'C', course: courses(:quality_assurance), term: terms(:one), capacity: 0)

    assert_not offering.valid?
  end

  test 'offering cannot be created if capacity is greater than 400' do
    offering = Offering.new(section: 'C', course: courses(:quality_assurance), term: terms(:one), capacity: 401)

    assert_not offering.valid?
  end

  test 'offering cannot be created if course does not exist' do
    offering = Offering.new(section: 'C', course_id: Course.last.id + 1, term: terms(:one), capacity: 100)

    assert_not offering.valid?
  end

  test 'offering cannot be created if term does not exist' do
    offering = Offering.new(section: 'C', course: courses(:quality_assurance), term_id: Term.last.id + 1, capacity: 100)

    assert_not offering.valid?
  end

  test 'offering cannot be created if identical offering already exists' do
    offering = Offering.new(section: 'A', course: courses(:quality_assurance), term: terms(:one), capacity: 100)

    assert_not offering.valid?
  end
end
