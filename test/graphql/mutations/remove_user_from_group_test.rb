# frozen_string_literal: true
require 'test_helper'

module Mutations
  class RemoveUserFromGroupTest < ActiveSupport::TestCase
    test '#resolve deletes the group membership with valid args' do
      group = groups(:self_enrolling)
      user = users(:not_admin)

      query = <<~EOF
        mutation RemoveUserFromGroup($userId: ID!, $groupId: ID!) {
          removeUserFromGroup(input: {userId: $userId, groupId: $groupId}) {
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

      data = result.dig('data', 'removeUserFromGroup')

      assert_not_nil data['user']
      assert_not_nil data['group']
      assert_not user.groups.include?(group)
    end

    test '#resolve returns an error if neither the user nor group exist' do
      query = <<~EOF
        mutation RemoveUserFromGroup($userId: ID!, $groupId: ID!) {
          removeUserFromGroup(input: {userId: $userId, groupId: $groupId}) {
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

      data = result.dig('data', 'removeUserFromGroup')
      error_message = data.dig('errors', 0, 'message')

      assert_nil data['user']
      assert_nil data['group']
      assert_equal 'Could not find user with id 0 and group with id 0.', error_message
    end

    test '#resolve returns an error if the user does not exist' do
      group = groups(:self_enrolling)

      query = <<~EOF
        mutation RemoveUserFromGroup($userId: ID!, $groupId: ID!) {
          removeUserFromGroup(input: {userId: $userId, groupId: $groupId}) {
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

      data = result.dig('data', 'removeUserFromGroup')
      error_message = data.dig('errors', 0, 'message')

      assert_nil data['user']
      assert_not_nil data['group']
      assert_equal 'Could not find user with id 0.', error_message
    end

    test '#resolve returns an error if the group does not exist' do
      user = users(:not_admin)

      query = <<~EOF
        mutation RemoveUserFromGroup($userId: ID!, $groupId: ID!) {
          removeUserFromGroup(input: {userId: $userId, groupId: $groupId}) {
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

      data = result.dig('data', 'removeUserFromGroup')
      error_message = data.dig('errors', 0, 'message')

      assert_not_nil data['user']
      assert_nil data['group']
      assert_equal 'Could not find group with id 0.', error_message
    end

    test '#resolve returns an error if the user is not a member of the group' do
      group = groups(:self_enrolling)
      user = users(:bob)

      query = <<~EOF
        mutation RemoveUserFromGroup($userId: ID!, $groupId: ID!) {
          removeUserFromGroup(input: {userId: $userId, groupId: $groupId}) {
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

      data = result.dig('data', 'removeUserFromGroup')
      error_message = data.dig('errors', 0, 'message')

      assert_not_nil data['user']
      assert_not_nil data['group']
      assert_equal "User is not a member of group #{group.id}.", error_message
    end

    test '#resolve does not delete a membership if the user is not authenticated' do
      user = users(:not_admin)
      group = groups(:self_enrolling)

      query = <<~EOF
        mutation DeleteUser {
          removeUserFromGroup(input: {userId: $userId, groupId: $groupId}) {
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

      assert user.groups.include?(group)
    end

    test '#resolve does not delete a membership if the user is not an admin' do
      user = users(:not_admin)
      group = groups(:self_enrolling)

      query = <<~EOF
        mutation DeleteUser {
          removeUserFromGroup(input: {userId: $userId, groupId: $groupId}) {
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

      assert user.groups.include?(group)
    end
  end
end
