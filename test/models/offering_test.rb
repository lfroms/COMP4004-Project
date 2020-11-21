# frozen_string_literal: true
require 'test_helper'

class OfferingTest < ActiveSupport::TestCase
  test 'offering can be created with valid section, course, and term' do
    offering = Offering.new(section: 'C', course: courses(:quality_assurance), term: terms(:one))

    assert offering.valid?
  end

  test 'offering cannot be created if section is missing' do
    offering = Offering.new(course: courses(:quality_assurance), term: terms(:one))

    assert_not offering.valid?
  end

  test 'offering cannot be created if course is missing' do
    offering = Offering.new(section: 'C', term: terms(:one))

    assert_not offering.valid?
  end

  test 'offering cannot be created if term is missing' do
    offering = Offering.new(section: 'C', course: courses(:quality_assurance))

    assert_not offering.valid?
  end

  test 'offering cannot be created if section is not a letter' do
    offering = Offering.new(section: 'ABC', course: courses(:quality_assurance), term: terms(:one))

    assert_not offering.valid?
  end

  test 'offering cannot be created if course does not exist' do
    offering = Offering.new(section: 'C', course_id: Course.last.id + 1, term: terms(:one))

    assert_not offering.valid?
  end

  test 'offering cannot be created if term does not exist' do
    offering = Offering.new(section: 'C', course: courses(:quality_assurance), term_id: Term.last.id + 1)

    assert_not offering.valid?
  end

  test 'offering cannot be created if identical offering already exists' do
    offering = Offering.new(section: 'A', course: courses(:quality_assurance), term: terms(:one))

    assert_not offering.valid?
  end
end
