# frozen_string_literal: true
require 'test_helper'

module Resolvers
  class SpecificOfferingTest < ActiveSupport::TestCase
    test '#resolve returns specified offering' do
      offering_id = offerings(:quality_assurance_A).id
      query = <<~EOF
        query Offering {
          offering(id: #{offering_id}) {
            section
            course_id
            term_id
          }
        }
      EOF

      results = CmsSchema.execute(query, context: {current_user: users(:not_admin)}, variables: {}).to_h
      offering = results.dig('data', 'offering')
      assert_equal offering(:quality_assurance_A).section, offering['section']
      assert_equal offering(:quality_assurance_A).course_id, offering['course_id']
      assert_equal offering(:quality_assurance_A).term_id, offering['term_id']
    end

    test '#resolve returns nil when specified offering does not exist' do
      query = <<~EOF
        query Offering {
          offering(id: 0) {
            section
            course_id
            term_id
          }
        }
      EOF

      results = CmsSchema.execute(query, context: {current_user: users(:not_admin)}, variables: {}).to_h
      value = results.dig('data', 'offering')

      assert_nil value
    end

    test '#resolve returns nil if the user is not authenticated' do
      offering_id = offerings(:quality_assurance_A).id
      query = <<~EOF
      query Offering {
        offering(id: #{offering_id}) {
          section
          course_id
          term_id
        }
      }
      EOF

      results = CmsSchema.execute(query, context: {}, variables: {}).to_h

      assert_nil results.dig('data', 'offering')
    end
  end
end
