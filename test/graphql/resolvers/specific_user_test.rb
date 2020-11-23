# frozen_string_literal: true
require 'test_helper'

module Resolvers
  class SpecificUserTest < ActiveSupport::TestCase
    test '#resolve returns specified user' do
      user_id = users(:not_admin).id
      query = <<~EOF
        query Users {
          user(id: #{user_id}) {
            name
            email
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      user = results.dig('data', 'user')
      assert_equal users(:not_admin).name, user['name']
      assert_equal users(:not_admin).email, user['email']
    end

    test '#resolve returns nil when specified user does not exist' do
      query = <<~EOF
        query Users {
          user(id: 0) {
            name
            email
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      value = results.dig('data', 'user')

      assert_nil value
    end

    test '#resolve returns nil if the current user is not authenticated' do
      user_id = User.last.id
      query = <<~EOF
        query Users {
          user(id: #{user_id}) {
            id
          }
        }
      EOF

      results = CmsSchema.execute(query, context: {}, variables: {}).to_h

      assert_nil results.dig('data', 'user')
    end

    test '#resolve returns nil if the current user is not an admin' do
      user_id = User.last.id
      query = <<~EOF
        query Users {
          user(id: #{user_id}) {
            id
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h

      assert_nil results.dig('data', 'user')
    end
  end
end
