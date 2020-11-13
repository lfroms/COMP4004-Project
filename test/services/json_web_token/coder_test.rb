# frozen_string_literal: true
require 'test_helper'

module JsonWebToken
  class CoderTest < ActiveSupport::TestCase
    test '::encode generates JSON web token with expiry date' do
      token = JsonWebToken::Coder.encode({}, 1.hour.from_now)
      expected = 1.hour.from_now.to_i
      actual = JWT.decode(token, Coder::SECRET_KEY)[0]['exp']

      assert_equal expected, actual
    end

    test '::encode uses default expiry of 24 hours' do
      token = JsonWebToken::Coder.encode({})
      expected = 24.hours.from_now.to_i
      actual = JWT.decode(token, Coder::SECRET_KEY)[0]['exp']

      assert_equal expected, actual
    end

    test '::decode decodes the token' do
      token = JsonWebToken::Coder.encode({ test: 'hello' })
      expected = 'hello'
      actual = JsonWebToken::Coder.decode(token)["test"]

      assert_equal expected, actual
    end
  end
end
