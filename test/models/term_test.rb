# frozen_string_literal: true
require 'test_helper'

class TermTest < ActiveSupport::TestCase
  test 'term can be created with all fields present' do
    term = Term.create(
      start_date: Time.zone.local(2020, 9, 1, 4, 5, 6),
      end_date: Time.zone.local(2020, 12, 15, 4, 5, 6),
      registration_deadline: Time.zone.local(2020, 9, 1, 4, 5, 6),
      withdrawal_deadline: Time.zone.local(2020, 10, 1, 4, 5, 6),
      financial_deadline: Time.zone.local(2020, 9, 30, 4, 5, 6)
    )

    assert term.valid?
  end

  test 'term cannot be created when missing if start_date is missing' do
    term = Term.new(
      end_date: Time.zone.local(2020, 12, 15, 4, 5, 6),
      registration_deadline: Time.zone.local(2020, 9, 1, 4, 5, 6),
      withdrawal_deadline: Time.zone.local(2020, 10, 1, 4, 5, 6),
      financial_deadline: Time.zone.local(2020, 9, 30, 4, 5, 6),
    )

    assert_not term.valid?
  end

  test 'term cannot be created when missing if end_date is missing' do
    term = Term.new(
      start_date: Time.zone.local(2020, 9, 1, 4, 5, 6),
      registration_deadline: Time.zone.local(2020, 9, 1, 4, 5, 6),
      withdrawal_deadline: Time.zone.local(2020, 10, 1, 4, 5, 6),
      financial_deadline: Time.zone.local(2020, 9, 30, 4, 5, 6),
    )

    assert_not term.valid?
  end

  test 'term cannot be created when missing if registration_deadline is missing' do
    term = Term.new(
      start_date: Time.zone.local(2020, 9, 1, 4, 5, 6),
      end_date: Time.zone.local(2020, 12, 15, 4, 5, 6),
      withdrawal_deadline: Time.zone.local(2020, 10, 1, 4, 5, 6),
      financial_deadline: Time.zone.local(2020, 9, 30, 4, 5, 6),
    )

    assert_not term.valid?
  end

  test 'term cannot be created when missing if withdrawal_deadline is missing' do
    term = Term.new(
      start_date: Time.zone.local(2020, 9, 1, 4, 5, 6),
      end_date: Time.zone.local(2020, 12, 15, 4, 5, 6),
      registration_deadline: Time.zone.local(2020, 9, 1, 4, 5, 6),
      financial_deadline: Time.zone.local(2020, 9, 30, 4, 5, 6),
    )

    assert_not term.valid?
  end

  test 'term cannot be created when missing if financial_deadline is missing' do
    term = Term.new(
      start_date: Time.zone.local(2020, 9, 1, 4, 5, 6),
      end_date: Time.zone.local(2020, 12, 15, 4, 5, 6),
      registration_deadline: Time.zone.local(2020, 9, 1, 4, 5, 6),
      withdrawal_deadline: Time.zone.local(2020, 10, 1, 4, 5, 6),
    )

    assert_not term.valid?
  end

  test 'term cannot be created if end_date is before start_date' do
    term = Term.new(
      start_date: Time.zone.local(2020, 12, 15, 4, 5, 6),
      end_date: Time.zone.local(2020, 9, 1, 4, 5, 6),
      registration_deadline: Time.zone.local(2020, 9, 1, 4, 5, 6),
      withdrawal_deadline: Time.zone.local(2020, 10, 1, 4, 5, 6),
      financial_deadline: Time.zone.local(2020, 9, 30, 4, 5, 6),
    )

    assert_not term.valid?
  end

  test 'term cannot be created if withdrawal deadline is outside the bounds of the term' do
    term = Term.new(
      start_date: Time.zone.local(2020, 12, 15, 4, 5, 6),
      end_date: Time.zone.local(2020, 9, 1, 4, 5, 6),
      registration_deadline: Time.zone.local(2020, 9, 1, 4, 5, 6),
      withdrawal_deadline: Time.zone.local(2020, 8, 1, 4, 5, 6),
      financial_deadline: Time.zone.local(2020, 9, 30, 4, 5, 6),
    )

    assert_not term.valid?
  end

  test 'term cannot be created if financial_deadline is outside the bounds of the term' do
    term = Term.new(
      start_date: Time.zone.local(2020, 12, 15, 4, 5, 6),
      end_date: Time.zone.local(2020, 9, 1, 4, 5, 6),
      registration_deadline: Time.zone.local(2020, 9, 1, 4, 5, 6),
      withdrawal_deadline: Time.zone.local(2020, 10, 1, 4, 5, 6),
      financial_deadline: Time.zone.local(2020, 8, 30, 4, 5, 6),
    )

    assert_not term.valid?
  end

  test 'term cannot be created if registration_deadline is after the end_date' do
    term = Term.new(
      start_date: Time.zone.local(2020, 9, 1, 4, 5, 6),
      end_date: Time.zone.local(2020, 12, 15, 4, 5, 6),
      registration_deadline: Time.zone.local(2020, 12, 16, 4, 5, 6),
      withdrawal_deadline: Time.zone.local(2020, 10, 1, 4, 5, 6),
      financial_deadline: Time.zone.local(2020, 9, 30, 4, 5, 6),
    )

    assert_not term.valid?
  end
end
