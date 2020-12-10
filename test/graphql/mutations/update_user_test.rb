# frozen_string_literal: true
require 'test_helper'

module Mutations
  class UpdateUserTest < ActiveSupport::TestCase
    test '#resolve updates a user with a new name and saves it to the db' do
      user_to_update = users(:not_admin)

      query = <<~EOF
        mutation UpdateUser {
          updateUser(input: {id: "#{user_to_update.id}", name: "Arnold"}) {
            user {
              name
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      id = result.dig('data', 'updateUser', 'user', 'id')
      user = User.find(id)

      assert_equal 'Arnold', user.name
    end

    test '#resolve updates a user with new groups and saves it to the db' do
      user_to_update = users(:not_admin)
      group = groups(:not_self_enrolling)

      query = <<~EOF
        mutation UpdateUser {
          updateUser(input: {id: "#{user_to_update.id}", groupIds: [#{group.id}]}) {
            user {
              name
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      id = result.dig('data', 'updateUser', 'user', 'id')
      user = User.find(id)

      assert_equal 'Not Admin', user.name
      assert_equal 1, user.groups.count
      assert_equal group, user.groups.first
    end

    test '#resolve returns error if id is not provided' do
      query = <<~EOF
        mutation UpdateUser {
          updateUser(input: {name: "Arnold"}) {
            user {
              name
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      error_message = result.dig('errors', 0, 'message')

      assert_equal "Argument 'id' on InputObject 'UpdateUserInput' is required. Expected type ID!", error_message
    end

    test '#resolve returns error and nil user if user does not exist' do
      query = <<~EOF
        mutation UpdateUser {
          updateUser(input: {id: -1, name: "Arnold"}) {
            user {
              name
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h

      user = result.dig('data', 'updateUser', 'user')
      error_message = result.dig('data', 'updateUser', 'errors', 0, 'message')

      assert_nil user
      assert_equal 'Could not find user with id -1', error_message
    end

    test '#resolve does not update user if user is not an admin' do
      user_to_update = users(:admin)

      query = <<~EOF
        mutation UpdateUser {
          updateUser(input: {id: "#{user_to_update.id}", name: "Arnold"}) {
            user {
              name
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      user = result.dig('data', 'updateUser', 'user')

      assert_nil user
      assert_equal 'First User', user_to_update.name
    end

    test '#resolve does not update user if user is not authorized' do
      user_to_update = users(:admin)

      query = <<~EOF
        mutation UpdateUser {
          updateUser(input: {id: "#{user_to_update.id}", name: "Arnold"}) {
            user {
              name
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, variables: {}).to_h
      user = result.dig('data', 'updateUser', 'user')

      assert_nil user
      assert_equal 'First User', user_to_update.name
    end
  end
end
