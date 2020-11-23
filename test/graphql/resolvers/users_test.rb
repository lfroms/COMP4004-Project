# frozen_string_literal: true
require 'test_helper'

module Resolvers
  class UsersTest < ActiveSupport::TestCase
    test '#resolve returns all saved users' do
      query = <<~EOF
        query Users {
          users {
            edges {
              node {
                name
                email
              }
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      users = results.dig('data', 'users', 'edges')
      assert_equal 3, users.length
      assert_equal users(:admin).name, users[0]['node']['name']
      assert_equal users(:not_admin).name, users[1]['node']['name']
    end

    test '#resolve does not return anything if the current user is not authenticated' do
      query = <<~EOF
        query Users {
          users {
            edges {
              node {
                id
              }
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: {}, variables: {}).to_h

      assert_nil results.dig('data', 'users')
    end

    test '#resolve does not return anything if the current user is not an admin' do
      query = <<~EOF
        query Users {
          users {
            edges {
              node {
                id
              }
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h

      assert_nil results.dig('data', 'users')
    end
  end
end
