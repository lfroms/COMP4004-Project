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

      results = CmsSchema.execute(query, context: {}, variables: {}).to_h
      users = results.dig('data', 'users', 'edges')
      assert_equal 2, users.length
      assert_equal users(:admin).name, users[0]['node']['name']
      assert_equal users(:not_admin_approved).name, users[1]['node']['name']
    end
  end
end
