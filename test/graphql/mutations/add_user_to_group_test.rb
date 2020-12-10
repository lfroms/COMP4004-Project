# frozen_string_literal: true
require 'test_helper'

module Mutations
  class AddUserToGroupTest < ActiveSupport::TestCase
    test '#resolve creates the group membership with valid args' do
      group = groups(:self_enrolling)
      user = users(:bob)

      query = <<~EOF
        mutation AddUserToGroup($userId: ID!, $groupId: ID!) {
          addUserToGroup(input: {userId: $userId, groupId: $groupId}) {
            user {
              id
            }
            group {
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(
        query,
        context: { current_user: users(:admin) },
        variables: {
          userId: user.id,
          groupId: group.id,
        }
      ).to_h

      data = result.dig('data', 'addUserToGroup')

      assert_not_nil data['user']
      assert_not_nil data['group']
      assert user.groups.include?(group)
    end

    test '#resolve returns an error if neither the user nor group exist' do
      query = <<~EOF
        mutation AddUserToGroup($userId: ID!, $groupId: ID!) {
          addUserToGroup(input: {userId: $userId, groupId: $groupId}) {
            user {
              id
            }
            group {
              id
            }
            errors {
              message
          }
          }
        }
      EOF

      result = CmsSchema.execute(
        query,
        context: { current_user: users(:admin) },
        variables: {
          userId: 0,
          groupId: 0,
        }
      ).to_h

      data = result.dig('data', 'addUserToGroup')
      error_message = data.dig('errors', 0, 'message')

      assert_nil data['user']
      assert_nil data['group']
      assert_equal 'Could not find user with id 0 and group with id 0.', error_message
    end

    test '#resolve returns an error if the user does not exist' do
      group = groups(:self_enrolling)

      query = <<~EOF
        mutation AddUserToGroup($userId: ID!, $groupId: ID!) {
          addUserToGroup(input: {userId: $userId, groupId: $groupId}) {
            user {
              id
            }
            group {
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(
        query,
        context: { current_user: users(:admin) },
        variables: {
          userId: 0,
          groupId: group.id,
        }
      ).to_h

      data = result.dig('data', 'addUserToGroup')
      error_message = data.dig('errors', 0, 'message')

      assert_nil data['user']
      assert_not_nil data['group']
      assert_equal 'Could not find user with id 0.', error_message
    end

    test '#resolve returns an error if the group does not exist' do
      user = users(:not_admin)

      query = <<~EOF
        mutation AddUserToGroup($userId: ID!, $groupId: ID!) {
          addUserToGroup(input: {userId: $userId, groupId: $groupId}) {
            user {
              id
            }
            group {
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(
        query,
        context: { current_user: users(:admin) },
        variables: {
          userId: user.id,
          groupId: 0,
        }
      ).to_h

      data = result.dig('data', 'addUserToGroup')
      error_message = data.dig('errors', 0, 'message')

      assert_not_nil data['user']
      assert_nil data['group']
      assert_equal 'Could not find group with id 0.', error_message
    end

    test '#resolve returns an error if the user is already a member of the group' do
      group = groups(:self_enrolling)
      user = users(:not_admin)

      query = <<~EOF
        mutation AddUserToGroup($userId: ID!, $groupId: ID!) {
          addUserToGroup(input: {userId: $userId, groupId: $groupId}) {
            user {
              id
            }
            group {
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(
        query,
        context: { current_user: users(:admin) },
        variables: {
          userId: user.id,
          groupId: group.id,
        }
      ).to_h

      data = result.dig('data', 'addUserToGroup')
      error_message = data.dig('errors', 0, 'message')

      assert_not_nil data['user']
      assert_not_nil data['group']
      assert_equal 'Not Admin is already a member of Self-enrolling.', error_message
    end

    test '#resolve does not delete a membership if the user is not authenticated' do
      user = users(:bob)
      group = groups(:self_enrolling)

      query = <<~EOF
        mutation DeleteUser {
          addUserToGroup(input: {userId: $userId, groupId: $groupId}) {
            user {
              id
            }
            group {
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      CmsSchema.execute(
        query,
        context: { current_user: users(:admin) },
        variables: {
          userId: user.id,
          groupId: group.id,
        }
      ).to_h

      assert_not user.groups.include?(group)
    end

    test '#resolve does not create a membership if the user is not an admin' do
      user = users(:bob)
      group = groups(:self_enrolling)

      query = <<~EOF
        mutation DeleteUser {
          addUserToGroup(input: {userId: $userId, groupId: $groupId}) {
            user {
              id
            }
            group {
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      CmsSchema.execute(
        query,
        context: { current_user: users(:not_admin) },
        variables: {
          userId: user.id,
          groupId: group.id,
        }
      ).to_h

      assert_not user.groups.include?(group)
    end
  end
end
