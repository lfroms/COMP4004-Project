# frozen_string_literal: true
require 'test_helper'

module Resolvers
  class CoursesTest < ActiveSupport::TestCase
    test '#resolve returns all courses' do
      query = <<~EOF
        query Courses {
          courses {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      courses = results.dig('data', 'courses', 'edges')

      assert_equal 2, courses.length
      assert_equal courses(:quality_assurance).name, courses[0]['node']['name']
      assert_equal courses(:object_oriented).name, courses[1]['node']['name']
    end

    test '#resolve does not return anything if the current user is not authenticated' do
      query = <<~EOF
        query Courses {
          courses {
            edges {
              node {
                id
              }
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: {}, variables: {}).to_h
      assert_nil results['data']
    end

    test '#resolve does not return anything if the current user is not an admin' do
      query = <<~EOF
        query Courses {
          courses {
            edges {
              node {
                id
              }
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      assert_nil results['data']
    end
  end
end
