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

    test '#resolve does not authenticates an nonexistent user and does not return a token' do
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
  end
end
