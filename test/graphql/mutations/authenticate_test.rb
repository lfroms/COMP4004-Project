# frozen_string_literal: true
require 'test_helper'

module Mutations
  class AuthenticateTest < ActiveSupport::TestCase
    test '#resolve authenticates an existing user and returns a token' do
      query = <<~EOF
        mutation TestMutation {
          authenticate(input: {email: "example1@example.com", password: "password"}) {
            token
          }
        }
      EOF

      result = CmsSchema.execute(query, context: {}, variables: {}).to_h
      token = result.dig('data', 'authenticate', 'token')

      assert_not_nil token
    end

    test '#resolve does not authenticate an nonexistent user and does not return a token' do
      query = <<~EOF
        mutation TestMutation {
          authenticate(input: {email: "fake@fake.com", password: "fake"}) {
            token
          }
        }
      EOF

      result = CmsSchema.execute(query, context: {}, variables: {}).to_h
      token = result.dig('data', 'authenticate', 'token')

      assert_nil token
    end

    test '#resolve does not authenticate a user that has not yet been approved' do
      query = <<~EOF
        mutation TestMutation {
          authenticate(input: {email: "example3@example.com", password: "password"}) {
            token
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: {}, variables: {}).to_h
      value = result.dig('data', 'authenticate')
      error_message = value.dig('errors', 0, 'message')

      assert_nil value['token']
      assert_equal 'This account has not yet been approved. Please try again later.', error_message
    end
  end
end
