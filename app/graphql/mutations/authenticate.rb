# frozen_string_literal: true
module Mutations
  class Authenticate < BaseMutation
    field :token, String, null: true

    argument :email, String, required: true
    argument :password, String, required: true

    def resolve(email:, password:)
      user = User.find_by(email: email).try(:authenticate, password)

      {
        token: user ? JsonWebToken::Coder.encode({ user_id: user.id }) : nil,
      }
    end
  end
end
