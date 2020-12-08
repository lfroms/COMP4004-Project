# frozen_string_literal: true
require 'test_helper'

module Mutations
  class CreateGradeTest < ActiveSupport::TestCase
    test '#resolve creates a new grade' do
      submission = submissions(:final_exam_submission)

      query = <<~EOF
        mutation CreateGrade($submissionId: ID!, $value: Float!, $comment: String!) {
          createGrade(input: { submissionId: $submissionId, comment: $comment, value: $value }) {
            grade {
              id
              comment
              value
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(
        query,
        context: { current_user: users(:bob) },
        variables: {
          submissionId: submission.id,
          value: 0.8,
          comment: 'A comment',
        }
      ).to_h

      id = result.dig('data', 'createGrade', 'grade', 'id')
      grade = Grade.find(id)

      assert_equal 'A comment', grade.comment
      assert_equal 0.8, grade.value
    end

    test '#resolve does not create a grade if the user is not enrolled in the course' do
      submission = submissions(:pirates_cucumber_submission)

      query = <<~EOF
        mutation CreateGrade($submissionId: ID!, $value: Float!, $comment: String!) {
          createGrade(input: { submissionId: $submissionId, comment: $comment, value: $value }) {
            grade {
              id
              comment
              value
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(
        query,
        context: { current_user: users(:not_admin) },
        variables: {
          submissionId: submission.id,
          value: 0.8,
          comment: 'A comment',
        }
      ).to_h

      grade = result.dig('data', 'createGrade', 'grade')
      error_message = result.dig('data', 'createGrade', 'errors', 0, 'message')

      assert_nil grade
      assert_equal 'You do not have permission to perform this action.', error_message
    end

    test '#resolve does not create a grade if the user is not a course professor' do
      submission = submissions(:pirates_cucumber_submission)

      query = <<~EOF
        mutation CreateGrade($submissionId: ID!, $value: Float!, $comment: String!) {
          createGrade(input: { submissionId: $submissionId, comment: $comment, value: $value }) {
            grade {
              id
              comment
              value
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(
        query,
        context: { current_user: users(:not_admin) },
        variables: {
          submissionId: submission.id,
          value: 0.8,
          comment: 'A comment',
        }
      ).to_h

      grade = result.dig('data', 'createGrade', 'grade')
      error_message = result.dig('data', 'createGrade', 'errors', 0, 'message')

      assert_nil grade
      assert_equal 'You do not have permission to perform this action.', error_message
    end

    test '#resolve does not create a grade if the submission does not exist' do
      query = <<~EOF
        mutation CreateGrade($submissionId: ID!, $value: Float!, $comment: String!) {
          createGrade(input: { submissionId: $submissionId, comment: $comment, value: $value }) {
            grade {
              id
              comment
              value
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(
        query,
        context: { current_user: users(:not_admin) },
        variables: {
          submissionId: 0,
          value: 0.8,
          comment: 'A comment',
        }
      ).to_h

      grade = result.dig('data', 'createGrade', 'grade')
      error_message = result.dig('data', 'createGrade', 'errors', 0, 'message')

      assert_nil grade
      assert_equal 'Could not find submission with id 0.', error_message
    end

    test '#resolve does not create a grade if the user is not authenticated' do
      submission = submissions(:pirates_cucumber_submission)

      query = <<~EOF
        mutation CreateGrade($submissionId: ID!, $value: Float!, $comment: String!) {
          createGrade(input: { submissionId: $submissionId, comment: $comment, value: $value }) {
            grade {
              id
              comment
              value
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(
        query,
        context: {},
        variables: {
          submission_id: submission.id,
          value: 0.8,
          comment: 'A comment',
        }
      ).to_h

      grade = result.dig('data', 'createGrade', 'grade')

      assert_nil grade
    end
  end
end
