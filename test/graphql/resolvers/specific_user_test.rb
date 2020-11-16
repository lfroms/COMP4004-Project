# frozen_string_literal: true
require 'test_helper'

module Resolvers
  class UsersTest < ActiveSupport::TestCase
    test '#resolve returns specified user' do
      user_id = User.last.id
      query = <<~EOF
        query Users {
          user(id: #{user_id}) {
            name
            email
          }
        }
      EOF

      results = CmsSchema.execute(query, context: {}, variables: {}).to_h
      user = results.dig('data', 'user')
      assert_equal users(:admin).name, user['name']
      assert_equal users(:admin).email, user['email']
    end
  end
end
