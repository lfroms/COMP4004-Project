# frozen_string_literal: true
require 'test_helper'

module Mutations
  class DeleteEnrollmentTest < ActiveSupport::TestCase
    test '#resolve soft deletes and returns specified enrollment' do
      enrollment_to_delete = enrollments(:student)

      query = <<~EOF
        mutation TestMutation {
          deleteEnrollment(input: {id: #{enrollment_to_delete.id}}) {
            enrollment {
              id
              deletedAt
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      enrollment = result.dig('data', 'deleteEnrollment', 'enrollment')

      assert_not_nil enrollment['deletedAt']
    end

    test '#resolve returns nil if specified enrollment does not exist' do
      query = <<~EOF
        mutation TestMutation {
          deleteEnrollment(input: {id: 0}) {
            enrollment {
              id
              deletedAt
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      value = result.dig('data', 'deleteEnrollment', 'enrollment')
      error_message = result.dig('data', 'deleteEnrollment', 'errors', 0, 'message')

      assert_equal 'Could not find enrollment with id 0.', error_message
      assert_nil value
    end

    test '#resolve does not delete an enrollment if the user is not authenticated' do
      enrollment_to_delete = Enrollment.first

      query = <<~EOF
        mutation TestMutation {
          deleteEnrollment(input: {id: #{enrollment_to_delete.id}}) {
            enrollment {
              id
              deletedAt
            }
          }
        }
      EOF

      CmsSchema.execute(query, context: {}, variables: {}).to_h
      enrollment = Enrollment.find_by(id: enrollment_to_delete.id)

      assert_nil enrollment.deleted_at
    end

    test '#resolve does not delete an enrollment that has already been deleted' do
      enrollment_to_delete = enrollments(:student)
      enrollment_to_delete.update(deleted_at: Time.zone.now)

      query = <<~EOF
        mutation TestMutation {
          deleteEnrollment(input: {id: #{enrollment_to_delete.id}}) {
            enrollment {
              id
              deletedAt
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin2) }, variables: {}).to_h
      value = result.dig('data', 'deleteEnrollment', 'enrollment')
      error_message = result.dig('data', 'deleteEnrollment', 'errors', 0, 'message')

      assert_equal "Enrollment with id #{enrollment_to_delete.id} has already been deleted.", error_message
      assert_nil value
    end

    test '#resolve does not delete an enrollment for a user if the current user is non self-enrolling and not an admin' do
      enrollment_to_delete = enrollments(:student)

      query = <<~EOF
        mutation TestMutation {
          deleteEnrollment(input: {id: #{enrollment_to_delete.id}}) {
            enrollment {
              id
              deletedAt
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin2) }, variables: {}).to_h
      value = result.dig('data', 'deleteEnrollment', 'enrollment')
      error_message = result.dig('data', 'deleteEnrollment', 'errors', 0, 'message')
      enrollment = Enrollment.find_by(id: enrollment_to_delete.id)

      assert_equal 'You do not have permission to perform this action.', error_message
      assert_nil value
      assert_nil enrollment.deleted_at
    end

    test '#resolve does not delete an enrollment for a professor user if the current user is not an admin' do
      enrollment_to_delete = enrollments(:prof)

      query = <<~EOF
        mutation TestMutation {
          deleteEnrollment(input: {id: #{enrollment_to_delete.id}}) {
            enrollment {
              id
              deletedAt
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      value = result.dig('data', 'deleteEnrollment', 'enrollment')
      error_message = result.dig('data', 'deleteEnrollment', 'errors', 0, 'message')
      enrollment = Enrollment.find_by(id: enrollment_to_delete.id)

      assert_equal 'You do not have permission to perform this action.', error_message
      assert_nil value
      assert_nil enrollment.deleted_at
    end
  end
end
