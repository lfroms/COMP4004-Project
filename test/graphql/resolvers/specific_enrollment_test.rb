# frozen_string_literal: true
require 'test_helper'

module Resolvers
  class SpecificEnrollmentTest < ActiveSupport::TestCase
    test '#resolve returns specified enrollment' do
      enrollment_id = enrollments(:student).id
      query = <<~EOF
        query Enrollment {
          enrollment(id: #{enrollment_id}) {
            role
            offering {
              section
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      enrollment = result.dig('data', 'enrollment')

      assert_equal 'A', enrollment.dig('offering', 'section')
      assert_equal 'student', enrollment['role']
    end

    test '#resolve returns nil when specified enrollment does not exist' do
      query = <<~EOF
        query Enrollment {
          enrollment(id: 0) {
            role
            offering {
              section
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      value = result.dig('data', 'enrollment')

      assert_nil value
    end

    test '#resolve returns nil if the user is not authenticated' do
      enrollment_id = enrollments(:student).id
      query = <<~EOF
        query Enrollment {
          enrollment(id: #{enrollment_id}) {
            role
            offering {
              section
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: {}, variables: {}).to_h

      assert_nil results.dig('data', 'enrollment')
    end

    test '#resolve returns nil if the user does not belong to the enrollment' do
      enrollment_id = enrollments(:student).id
      query = <<~EOF
        query Enrollment {
          enrollment(id: #{enrollment_id}) {
            role
            offering {
              section
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:not_admin2) }, variables: {}).to_h

      assert_nil results.dig('data', 'enrollment')
    end
  end
end
