# frozen_string_literal: true
require 'test_helper'

module Mutations
  class UpdateEnrollmentTest < ActiveSupport::TestCase
    test '#resolve updates an enrollment with a final grade' do
      enrollment_to_update = enrollments(:object_oriented_student)

      query = <<~EOF
        mutation UpdateEnrollment {
          updateEnrollment(input: {id: "#{enrollment_to_update.id}", finalGrade: "A+"}) {
            enrollment {
              id
              finalGrade
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:bob) }, variables: {}).to_h
      id = result.dig('data', 'updateEnrollment', 'enrollment', 'id')
      enrollment = Enrollment.find(id)

      assert_equal 'A+', enrollment.final_grade
    end

    test '#resolve does not update enrollment if current user is not authenticated' do
      enrollment_to_update = enrollments(:object_oriented_student)

      query = <<~EOF
        mutation UpdateEnrollment {
          updateEnrollment(input: {id: "#{enrollment_to_update.id}", finalGrade: "A+"}) {
            enrollment {
              id
              finalGrade
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { }, variables: {}).to_h
      enrollment = result.dig('data', 'updateEnrollment', 'enrollment')

      assert_nil enrollment
    end

    test '#resolve does not update enrollment if current user is not the professor of the course' do
      enrollment_to_update = enrollments(:object_oriented_student)

      query = <<~EOF
        mutation UpdateEnrollment {
          updateEnrollment(input: {id: "#{enrollment_to_update.id}", finalGrade: "A+"}) {
            enrollment {
              id
              finalGrade
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:sally) }, variables: {}).to_h
      enrollment = result.dig('data', 'updateEnrollment', 'enrollment')
      error_message = result.dig('data', 'updateEnrollment', 'errors', 0, message)

      assert_nil enrollment
      assert_equal 'You do not have permission to perform this action.', error_message
    end

    test '#resolve does not update enrollment if it does not exist' do
      query = <<~EOF
        mutation UpdateEnrollment {
          updateEnrollment(input: {id: 0, finalGrade: "A+"}) {
            enrollment {
              id
              finalGrade
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:sally) }, variables: {}).to_h
      enrollment = result.dig('data', 'updateEnrollment', 'enrollment')

      assert_nil enrollment
    end
  end
end
