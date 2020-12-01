# frozen_string_literal: true
module Mutations
  class RegisterUserTest < ActiveSupport::TestCase
    test '#resolve creates a new user and saves it to the database without needing to be an admin user and authenticated' do
      query = <<~EOF
        mutation RegisterUser {
          registerUser(input: {name: "Test User", email: "fred@fake.com", password: "password"}) {
            user {
              id
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, variables: {}).to_h
      id = result.dig('data', 'registerUser', 'user', 'id')

      user = User.find(id)

      assert_equal user.name, 'Test User'
      assert_equal user.email, 'fred@fake.com'
    end
  end
end
