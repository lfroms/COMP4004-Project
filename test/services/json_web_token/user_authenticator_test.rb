# frozen_string_literal: true
require 'test_helper'

module JsonWebToken
  class UserAuthenticatorTest < ActiveSupport::TestCase
    test '::validate returns a matching user if the token matches a user that exists' do
      mock_headers = {
        'Authorization' => "Bearer #{Coder.encode({ 'user_id' => users(:admin).id })}",
      }
      user = JsonWebToken::UserAuthenticator.validate(mock_headers)

      assert_equal users(:admin).id, user.id
    end

    test '::validate returns nil if the token does not match a user' do
      mock_headers = {
        'Authorization' => "Bearer #{Coder.encode({ 'user_id' => 1 })}",
      }
      user = JsonWebToken::UserAuthenticator.validate(mock_headers)

      assert_nil user
    end
  end
end
