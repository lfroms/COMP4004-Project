# frozen_string_literal: true
require 'test_helper'

module Mutations
  class DeleteEnrollmentTest < ActiveSupport::TestCase
    test '#resolve soft deletes and returns specified enrollment' do
      enrollment_to_delete = Enrollment.first

      query = <<~EOF
        mutation TestMutation {
          deleteEnrollment(input: {id: #{enrollment_to_delete.id}}) {
            enrollment {
              id
              deleted_at
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      assert_not_nil enrollment.deleted_at
      assert enrollment.present?
    end

    test '#resolve returns nil if specified enrollment does not exist' do
      query = <<~EOF
        mutation TestMutation {
          deleteEnrollment(input: {id: 0}) {
            enrollment {
              id
              deleted_at
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      value = result.dig('data', 'deleteEnrollment', 'enrollment')

      assert_nil value
    end

    test '#resolve does not delete an enrollment if the user is not authenticated' do
      enrollment_to_delete = Enrollment.first

      query = <<~EOF
        mutation TestMutation {
          deleteEnrollment(input: {id: #{enrollment_to_delete.id}}) {
            enrollment {
              id
              deleted_at
            }
          }
        }
      EOF

      CmsSchema.execute(query, context: {}, variables: {}).to_h
      enrollment = Enrollment.find_by(id: enrollment_to_delete.id)

      assert enrollment.present?
    end

    test '#resolve does not delete an enrollment for a professor if the current user is not an admin' do
      enrollment_to_delete = enrollments(:prof)

      query = <<~EOF
        mutation TestMutation {
          deleteEnrollment(input: {id: #{enrollment_to_delete.id}}) {
            enrollment {
              id
              deleted_at
            }
          }
        }
      EOF

      CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      enrollment = Enrollment.find_by(id: enrollment_to_delete.id)

      assert enrollment.present?
    end
  end
end
