# frozen_string_literal: true
require 'test_helper'

module Resolvers
  class GroupsTest < ActiveSupport::TestCase
    test '#resolve returns all groups' do
      query = <<~EOF
        query Groups {
          groups {
            edges {
              node {
                name
                canSelfEnroll
              }
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      groups = results.dig('data', 'groups', 'edges')

      assert_equal 2, groups.length
      assert_equal groups(:self_enrolling).name, groups[0]['node']['name']
      assert_equal groups(:not_self_enrolling).name, groups[1]['node']['name']
    end

    test '#resolve does not return anything if the current user is not authenticated' do
      query = <<~EOF
        query Groups {
          groups {
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
        query Groups {
          groups {
            edges {
              node {
                id
              }
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:not_admin_approved) }, variables: {}).to_h
      assert_nil results['data']
    end
  end
end
