# frozen_string_literal: true
module Mutations
  class CreateUser < BaseMutation
    include Authenticatable

    field :user, Types::UserType, null: true
    field :errors, [Types::UserError], null: false

    argument :name, String, required: true
    argument :email, String, required: true
    argument :password, String, required: true
    argument :admin, Boolean, required: true

    def resolve(name:, email:, password:, admin:)
      assert_authenticated!
      assert_admin_user!

      user = User.new(name: name, email: email, password: password, admin: admin)

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
