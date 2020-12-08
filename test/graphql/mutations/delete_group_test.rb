# frozen_string_literal: true
require 'test_helper'

module Mutations
  class DeleteGroupTest < ActiveSupport::TestCase
    test '#resolve deletes and returns specified group' do
      group_to_delete = groups(:not_self_enrolling)

      query = <<~EOF
        mutation DeleteGroup($id: ID!) {
          deleteGroup(input: {id: $id}) {
            group {
              id
              name
            }
          }
        }
      EOF

      result = CmsSchema.execute(
        query,
         context: { current_user: users(:admin) },
          variables: {
            id: group_to_delete.id,
          }
      ).to_h

      group = result.dig('data', 'deleteGroup', 'group')

      assert_not_nil group
      assert_nil Group.find_by(id: group_to_delete.id)
    end

    test '#resolve returns nil and error message if specified group does not exist' do
      query = <<~EOF
        mutation DeleteGroup($id: ID!) {
          deleteGroup(input: {id: $id}) {
            group {
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: { id: 0 }).to_h
      value = result.dig('data', 'deleteGroup', 'group')
      error_message = result.dig('data', 'deleteGroup', 'errors', 0, 'message')

      assert_equal 'Could not find group with id 0.', error_message
      assert_nil value
    end

    test '#resolve does not delete a group if the user is not authenticated' do
      group_to_delete = groups(:not_self_enrolling)

      query = <<~EOF
        mutation DeleteGroup($id: ID!) {
          deleteGroup(input: {id: $id}) {
              group {
                id
              }
            }
          }
      EOF

      CmsSchema.execute(query, context: {}, variables: { id: group_to_delete.id }).to_h
      group = Group.find_by(id: group_to_delete.id)

      assert group.present?
    end

    test '#resolve does not delete a user if the current user is not an admin' do
      group_to_delete = groups(:not_self_enrolling)

      query = <<~EOF
        mutation DeleteGroup($id: ID!) {
          deleteGroup(input: {id: $id}) {
              group {
                id
              }
            }
          }
      EOF

      CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: { id: group_to_delete.id }).to_h
      group = Group.find_by(id: group_to_delete.id)

      assert group.present?
    end
  end
end
