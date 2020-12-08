# frozen_string_literal: true
module Mutations
  class CreateGroupTest < ActiveSupport::TestCase
    test '#resolve creates a new group and saves it to the database' do
      query = <<~EOF
        mutation CreateGroup($name: String!, $canSelfEnroll: Boolean!) {
          createGroup(input: {name: $name, canSelfEnroll: $canSelfEnroll}) {
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
           name: 'Test group',
           canSelfEnroll: true,
         }
      ).to_h

      id = result.dig('data', 'createGroup', 'group', 'id')

      group = Group.find(id)

      assert_equal 'Test group', group.name
      assert group.can_self_enroll
    end

    test '#resolve does not create a new group if the user is not authenticated' do
      query = <<~EOF
        mutation CreateGroup($name: String!, $canSelfEnroll: Boolean!) {
          createGroup(input: {name: $name, canSelfEnroll: $canSelfEnroll}) {
            group {
              id
              name
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(
        query,
        context: {},
         variables: {
           name: 'Test group',
           canSelfEnroll: true,
         }
      ).to_h

      id = result.dig('data', 'createGroup', 'group', 'id')
      group = Group.find_by(id: id)

      assert_nil group
    end

    test '#resolve does not create a new group if the user is not an admin' do
      query = <<~EOF
        mutation CreateGroup($name: String!, $canSelfEnroll: Boolean!) {
          createGroup(input: {name: $name, canSelfEnroll: $canSelfEnroll}) {
            group {
              id
              name
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
           name: 'Test group',
           canSelfEnroll: true,
         }
      ).to_h

      id = result.dig('data', 'createGroup', 'group', 'id')
      group = Group.find_by(id: id)

      assert_nil group
    end
  end
end
