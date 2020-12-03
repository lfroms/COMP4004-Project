# frozen_string_literal: true
require 'test_helper'
module Mutations
  class CreateEnrollmentTest < ActiveSupport::TestCase
    test '#resolve creates a new enrollment and saves it to the database' do
      user_id = users(:not_admin).id
      offering_id = offerings(:quality_assurance_B).id
      query = <<~EOF
        mutation CreateEnrollment {
          createEnrollment(input: {role: "student", userId: #{user_id}, offeringId: #{offering_id}}) {
            enrollment {
              id
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      id = result.dig('data', 'createEnrollment', 'enrollment', 'id')

      enrollment = Enrollment.find_by(id: id)

      assert_equal enrollment.role, 'student'
      assert_equal enrollment.user.id, user_id
      assert_equal enrollment.offering.id, offering_id
    end

    test '#resolve does not create a new enrollment if the user is not authenticated' do
      user_id = users(:not_admin).id
      offering_id = offerings(:quality_assurance_B).id
      query = <<~EOF
        mutation CreateEnrollment {
          createEnrollment(input: {role: "professor", userId: #{user_id}, offerId: #{offering_id}}) {
            enrollment {
              id
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      id = result.dig('data', 'createEnrollment', 'enrollment', 'id')

      enrollment = Enrollment.find_by(id: id)

      assert_nil enrollment
    end

    test '#resolve does not create a new enrollment for a professor if the user is not an admin' do
      user_id = users(:not_admin2).id
      offering_id = offerings(:quality_assurance_B).id
      query = <<~EOF
        mutation CreateEnrollment {
          createEnrollment(input: {role: "professor", userId: #{user_id}, offeringId: #{offering_id}}) {
            enrollment {
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      p result
      id = result.dig('data', 'createEnrollment', 'enrollment', 'id')
      error_message = result.dig('data', 'createEnrollment', 'errors', 0, 'message')
      enrollment = Enrollment.find_by(id: id)

      assert_equal 'You do not have permission to perform this action.', error_message
      assert_nil enrollment
    end

    test '#resolve does not create an enrollment for a user if the current user is non self-enrolling and not an admin' do
      user_id = users(:not_admin).id
      offering_id = offerings(:quality_assurance_B).id
      query = <<~EOF
        mutation CreateEnrollment {
          createEnrollment(input: {role: "student", userId: #{user_id}, offeringId: #{offering_id}}) {
            enrollment {
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin2) }, variables: {}).to_h
      id = result.dig('data', 'createEnrollment', 'enrollment', 'id')
      error_message = result.dig('data', 'createEnrollment', 'errors', 0, 'message')
      enrollment = Enrollment.find_by(id: id)

      assert_equal 'You do not have permission to perform this action.', error_message
      assert_nil enrollment
    end

    test '#resolve does not create an enrollment that already exists' do
      user_id = users(:not_admin).id
      offering_id = offerings(:quality_assurance_A).id
      query = <<~EOF
        mutation CreateEnrollment {
          createEnrollment(input: {role: "student", userId: #{user_id}, offeringId: #{offering_id}}) {
            enrollment {
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      id = result.dig('data', 'createEnrollment', 'enrollment', 'id')
      error_message = result.dig('data', 'createEnrollment', 'errors', 0, 'message')
      enrollment = Enrollment.find_by(id: id)

      assert_equal "User with id #{user_id} is already enrolled in offering with id #{offering_id}.", error_message
      assert_nil enrollment
    end
  end
end
