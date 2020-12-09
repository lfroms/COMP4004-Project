# frozen_string_literal: true
require 'test_helper'

module Mutations
  class UpdateGroupTest < ActiveSupport::TestCase
    test '#resolve updates a group' do
      group = groups(:self_enrolling)

      query = <<~EOF
        mutation UpdateGroup($id: ID!, $name: String, $canSelfEnroll: Boolean) {
          updateGroup(input: {id: $id, name: $name, canSelfEnroll: $canSelfEnroll}) {
            group {
              id
              name
              canSelfEnroll
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
           id: group.id,
           name: 'Updated name',
           canSelfEnroll: false,
         }
      ).to_h

      id = result.dig('data', 'updateGroup', 'group', 'id')
      group = Group.find(id)

      assert_equal 'Updated name', group.name
      assert_not group.can_self_enroll
    end

    test '#resolve returns error and nil user if group does not exist' do
      query = <<~EOF
        mutation UpdateGroup($id: ID!, $name: String, $canSelfEnroll: Boolean) {
          updateGroup(input: {id: $id, name: $name, canSelfEnroll: $canSelfEnroll}) {
            group {
              id
              name
              canSelfEnroll
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
           id: 0,
           name: 'Updated name',
           canSelfEnroll: false,
         }
      ).to_h

      group = result.dig('data', 'updateGroup', 'group')
      error_message = result.dig('data', 'updateGroup', 'errors', 0, 'message')

      assert_nil group
      assert_equal 'Could not find group with id 0.', error_message
    end

    test '#resolve does not update group if user is not an admin' do
      group = groups(:self_enrolling)

      query = <<~EOF
        mutation UpdateGroup($id: ID!, $name: String, $canSelfEnroll: Boolean) {
          updateGroup(input: {id: $id, name: $name, canSelfEnroll: $canSelfEnroll}) {
            group {
              id
              name
              canSelfEnroll
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(
        query,
        context: { current_user: users(:not_admin) },
        variables: {
          id: 0,
          name: 'Updated name',
          canSelfEnroll: false,
        }
      ).to_h

      updated_group = result.dig('data', 'updateGroup', 'group')

      assert_nil updated_group
      assert_equal 'Self-enrolling', group.name
      assert group.can_self_enroll
    end

    test '#resolve does not update group if user is not authenticated' do
      group = groups(:self_enrolling)

      query = <<~EOF
        mutation UpdateGroup($id: ID!, $name: String, $canSelfEnroll: Boolean) {
          updateGroup(input: {id: $id, name: $name, canSelfEnroll: $canSelfEnroll}) {
            group {
              id
              name
              canSelfEnroll
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: {}, variables: {}).to_h
      updated_group = result.dig('data', 'updateGroup', 'group')

      assert_nil updated_group
      assert_equal 'Self-enrolling', group.name
      assert group.can_self_enroll
    end
  end
end
