# frozen_string_literal: true
require 'test_helper'

module Queries
  class UsersTest < ActiveSupport::TestCase
    test '#resolve returns all saved users' do
      query = <<~EOF
        query testQuery {
          users {
            name
            email
          }
        }
      EOF

      results = CmsSchema.execute(query, context: {}, variables: {}).to_h.dig('data', 'users')

      assert_equal 2, results.length
      assert_equal users(:admin).name, results[0]['name']
      assert_equal users(:not_admin_approved).name, results[1]['name']
    end
  end
end
