# frozen_string_literal: true
require 'test_helper'

class DeliverableTest < ActiveSupport::TestCase
  test 'deliverables can be created with valid arguments' do
    deliverable = Deliverable.new(
      title: 'My Deliverable',
      description: 'Description',
      weight: 0.5,
      due_date: Time.zone.local(2020, 10, 1, 4, 5, 6),
      offering: offerings(:quality_assurance_section_a)
    )

    assert deliverable.valid?
  end

  test 'deliverables cannot be created if title missing' do
    deliverable = Deliverable.new(
      description: 'Description',
      weight: 0.5,
      due_date: Time.zone.local(2020, 10, 1, 4, 5, 6),
      offering: offerings(:quality_assurance_section_a)
    )

    assert_not deliverable.valid?
  end

  test 'deliverables cannot be created if description missing' do
    deliverable = Deliverable.new(
      description: 'Description',
      weight: 0.5,
      due_date: Time.zone.local(2020, 10, 1, 4, 5, 6),
      offering: offerings(:quality_assurance_section_a)
    )

    assert_not deliverable.valid?
  end

  test 'deliverables cannot be created if weight missing' do
    deliverable = Deliverable.new(
      title: 'My Deliverable',
      description: 'Description',
      due_date: Time.zone.local(2020, 10, 1, 4, 5, 6),
      offering: offerings(:quality_assurance_section_a)
    )

    assert_not deliverable.valid?
  end

  test 'deliverables cannot be created if due_date missing' do
    deliverable = Deliverable.new(
      title: 'My Deliverable',
      description: 'Description',
      weight: 0.5,
      offering: offerings(:quality_assurance_section_a)
    )

    assert_not deliverable.valid?
  end

  test 'deliverables cannot be created if offering missing' do
    deliverable = Deliverable.new(
      title: 'My Deliverable',
      description: 'Description',
      weight: 0.5,
      due_date: Time.zone.local(2020, 10, 1, 4, 5, 6),
    )

    assert_not deliverable.valid?
  end

  test 'deliverables cannot be created if weight is outside the range of 0..1' do
    deliverable = Deliverable.new(
      title: 'My Deliverable',
      description: 'Description',
      weight: 5,
      due_date: Time.zone.local(2020, 10, 1, 4, 5, 6),
      offering: offerings(:quality_assurance_section_a)
    )

    assert_not deliverable.valid?
  end

  test '#due_date_passed is true if the current date is greater than the due date' do
    deliverable = Deliverable.new(
      title: 'My Deliverable',
      description: 'Description',
      weight: 0.5,
      due_date: 1.hour.ago,
      offering: offerings(:quality_assurance_section_a)
    )

    assert deliverable.due_date_passed
  end

  test '#due_date_passed is false if the current date is less than the due date' do
    deliverable = Deliverable.new(
      title: 'My Deliverable',
      description: 'Description',
      weight: 0.5,
      due_date: Time.zone.tomorrow,
      offering: offerings(:quality_assurance_section_a)
    )

    assert_not deliverable.due_date_passed
  end
end
