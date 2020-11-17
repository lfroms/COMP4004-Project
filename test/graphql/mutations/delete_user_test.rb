# frozen_string_literal: true
require 'test_helper'

module Mutations
  class DeleteUserTest < ActiveSupport::TestCase
    test '#resolve deletes and returns specified user' do
      user_to_delete = User.last

      query = <<~EOF
        mutation TestMutation {
          deleteUser(input: {id: #{user_to_delete.id}}) {
            user {
              name
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: {}, variables: {}).to_h
      user = result.dig('data', 'deleteUser', 'user')

      assert_not_nil user
      assert_equal user_to_delete.name, user['name']
    end

    test '#resolve returns nil if specified user does not exist' do
      query = <<~EOF
        mutation TestMutation {
          deleteUser(input: {id: 0}) {
            user {
              name
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: {}, variables: {}).to_h
      value = result.dig('data', 'deleteUser', 'user')

      assert_nil value
    end
  end
end
