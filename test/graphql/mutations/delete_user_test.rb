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

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      user = result.dig('data', 'deleteUser', 'user')

      assert_not_nil user
      assert_equal user_to_delete.name, user['name']
    end

    test '#resolve returns nil and error message if specified user does not exist' do
      query = <<~EOF
        mutation TestMutation {
          deleteUser(input: {id: 0}) {
            user {
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      value = result.dig('data', 'deleteUser', 'user')
      error_message = result.dig('data', 'deleteUser', 'errors', 0, 'message')

      assert_equal 'Could not find user with id 0.', error_message
      assert_nil value
    end

    test '#resolve does not delete a user if the user is not authenticated' do
      user_to_delete = User.last

      query = <<~EOF
        mutation DeleteUser {
          deleteUser(input: {id: #{user_to_delete.id}}) {
            user {
              id
            }
          }
        }
      EOF

      CmsSchema.execute(query, context: {}, variables: {}).to_h
      user = User.find_by(id: user_to_delete.id)

      assert user.present?
    end

    test '#resolve does not delete a user if the current user is not an admin' do
      user_to_delete = User.last

      query = <<~EOF
        mutation DeleteUser {
          deleteUser(input: {id: #{user_to_delete.id}}) {
            user {
              id
            }
          }
        }
      EOF

      CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      user = User.find_by(id: user_to_delete.id)

      assert user.present?
    end
  end
end
