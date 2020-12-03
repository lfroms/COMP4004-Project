# frozen_string_literal: true
module Authenticatable
  module Message
    UNAUTHORIZED = 'You are not authorized to perform this request.'
  end

  module Code
    UNAUTHORIZED = 'unauthorized'
  end

  module Reason
    INSUFFICIENT_PRIVILEGES = 'insufficientPrivileges'
    INVALID_TOKEN = 'invalidToken'
    INVALID_ENROLLMENT = 'invalidEnrollment'
  end

  def assert_authenticated!
    return if context[:current_user]

    raise GraphQL::ExecutionError.new(
      Message::UNAUTHORIZED,
       extensions: {
         code: Code::UNAUTHORIZED,
         reason: Reason::INVALID_TOKEN,
       }
    )
  end

  def assert_admin_user!
    return if context[:current_user]&.admin

    raise GraphQL::ExecutionError.new(
      Message::UNAUTHORIZED,
       extensions: {
         code: Code::UNAUTHORIZED,
         reason: Reason::INSUFFICIENT_PRIVILEGES,
       }
    )
  end
end
