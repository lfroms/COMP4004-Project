# frozen_string_literal: true
module Mutations
  class RegisterUser < BaseMutation
    include Authenticatable

    field :user, Types::UserType, null: true
    field :errors, [Types::UserError], null: false

    argument :name, String, required: true
    argument :email, String, required: true
    argument :password, String, required: true

    def resolve(name:, email:, password:)
      user = User.new(name: name, email: email, password: password)

      if user.save
        {
          user: user,
          errors: [],
        }
      else
        {
          user: nil,
          errors: Types::UserError.from(user.errors_hash),
        }
      end
    end
  end
end
