# frozen_string_literal: true
require 'test_helper'

class GradeTest < ActiveSupport::TestCase
  test 'grade can be created with valid arguments' do
    grade = Grade.new(value: 0.8, comment: 'hello', submission: submissions(:assignment_submission_one))

    assert grade.valid?
  end

  test 'grade can be created without comment' do
    grade = Grade.new(value: 0.8, submission: submissions(:assignment_submission_one))

    assert grade.valid?
  end

  test 'grade cannot be created with value greater than 1' do
    grade = Grade.new(value: 1.2, submission: submissions(:assignment_submission_one))

    assert_not grade.valid?
  end

  test 'grade cannot be created with value less than 0' do
    grade = Grade.new(value: -0.5, submission: submissions(:assignment_submission_one))

    assert_not grade.valid?
  end

  test 'grade cannot be created with missing value' do
    grade = Grade.new(submission: submissions(:assignment_submission_one))

    assert_not grade.valid?
  end
end
