# frozen_string_literal: true
module Mutations
  class Authenticate < BaseMutation
    field :token, String, null: true
    field :errors, [Types::UserError], null: false

    argument :email, String, required: true
    argument :password, String, required: true

    def resolve(email:, password:)
      user = User.find_by(email: email).try(:authenticate, password)

      unless user
        return {
          token: nil,
          errors: Types::UserError.from('The username or password is incorrect.'),
        }
      end

      if user.approved
        {
          token: JsonWebToken::Coder.encode({ user_id: user.id }),
          errors: [],
        }
      else
        {
          token: nil,
          errors: Types::UserError.from('This account has not yet been approved. Please try again later.'),
        }
      end
    end
  end
end
