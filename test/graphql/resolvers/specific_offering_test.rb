# frozen_string_literal: true
require 'test_helper'

module Resolvers
  class SpecificOfferingTest < ActiveSupport::TestCase
    test '#resolve returns specified offering' do
      offering_id = offerings(:quality_assurance_section_a).id
      query = <<~EOF
        query Offering {
          offering(id: #{offering_id}) {
            section
            course {
              code
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      offering = results.dig('data', 'offering')
      assert_equal offerings(:quality_assurance_section_a).section, offering['section']
      assert_equal offerings(:quality_assurance_section_a).course.code, offering.dig('course', 'code')
    end

    test '#resolve returns specified offering to admins even if they are not enrolled' do
      offering_id = offerings(:quality_assurance_section_a).id
      query = <<~EOF
        query Offering {
          offering(id: #{offering_id}) {
            section
            course {
              code
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      offering = results.dig('data', 'offering')
      assert_equal offerings(:quality_assurance_section_a).section, offering['section']
      assert_equal offerings(:quality_assurance_section_a).course.code, offering.dig('course', 'code')
    end

    test '#resolve returns nil when specified offering does not exist' do
      query = <<~EOF
        query Offering {
          offering(id: 0) {
            section
            course {
              code
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      value = results.dig('data', 'offering')

      assert_nil value
    end

    test '#resolve returns nil if the user is not authenticated' do
      offering_id = offerings(:quality_assurance_section_a).id
      query = <<~EOF
        query Offering {
          offering(id: #{offering_id}) {
            section
            course {
              code
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: {}, variables: {}).to_h

      assert_nil results.dig('data', 'offering')
    end

    test '#resolve returns nil if the user is not enrolled in the offering' do
      offering_id = offerings(:quality_assurance_section_a).id
      query = <<~EOF
        query Offering {
          offering(id: #{offering_id}) {
            section
            course {
              code
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:bob) }, variables: {}).to_h

      assert_nil results.dig('data', 'offering')
    end
  end
end
