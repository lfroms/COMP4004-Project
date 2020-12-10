# frozen_string_literal: true
module Mutations
  class CreateUserTest < ActiveSupport::TestCase
    test '#resolve creates a new user and saves it to the database' do
      query = <<~EOF
        mutation CreateUser {
          createUser(input: {name: "Test User", email: "fake@fake.com", password: "password", admin: false}) {
            user {
              id
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      id = result.dig('data', 'createUser', 'user', 'id')

      user = User.find(id)

      assert_equal user.name, 'Test User'
      assert_equal user.email, 'fake@fake.com'
    end

    test '#resolve creates a new user with group memberships and saves it to the database' do
      group_id = groups(:not_self_enrolling).id

      query = <<~EOF
        mutation CreateUser {
          createUser(input: {name: "Test User", email: "fake@fake.com", password: "password", admin: false, groupIds: [#{group_id}]}) {
            user {
              id
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      id = result.dig('data', 'createUser', 'user', 'id')

      user = User.find(id)

      assert_equal user.name, 'Test User'
      assert_equal user.email, 'fake@fake.com'
      assert_equal groups(:not_self_enrolling), user.groups.first
    end

    test '#resolve does not create a new user if the user is not authenticated' do
      query = <<~EOF
        mutation CreateUser {
          createUser(input: {name: "Test User", email: "fake@fake.com", password: "password", admin: false}) {
            user {
              id
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: {}, variables: {}).to_h
      id = result.dig('data', 'createUser', 'user', 'id')
      user = User.find_by(id: id)

      assert_nil user
    end

    test '#resolve does not create a new user if the current user is not an admin' do
      query = <<~EOF
        mutation CreateUser {
          createUser(input: {name: "Test User", email: "fake@fake.com", password: "password", admin: false}) {
            user {
              id
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      id = result.dig('data', 'createUser', 'user', 'id')
      user = User.find_by(id: id)

      assert_nil user
    end
  end
end
