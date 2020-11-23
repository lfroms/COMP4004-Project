# frozen_string_literal: true
require 'test_helper'

module Resolvers
  class SpecificCourseTest < ActiveSupport::TestCase
    test '#resolve returns specified course' do
      course_id = courses(:quality_assurance).id
      query = <<~EOF
        query Course {
          course(id: #{course_id}) {
            name
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      course = results.dig('data', 'course')
      assert_equal courses(:quality_assurance).name, course['name']
    end

    test '#resolve returns nil when specified course does not exist' do
      query = <<~EOF
        query Course {
          course(id: 0) {
            name
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      value = results.dig('data', 'course')

      assert_nil value
    end

    test '#resolve returns nil if the current user is not authenticated' do
      course_id = courses(:quality_assurance).id
      query = <<~EOF
        query Course {
          course(id: #{course_id}) {
            name
          }
        }
      EOF

      results = CmsSchema.execute(query, context: {}, variables: {}).to_h

      assert_nil results.dig('data', 'course')
    end

    test '#resolve returns nil if the current user is not an admin' do
      course_id = courses(:quality_assurance).id
      query = <<~EOF
        query Course {
          course(id: #{course_id}) {
            name
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h

      assert_nil results.dig('data', 'course')
    end
  end
end
