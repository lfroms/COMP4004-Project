# frozen_string_literal: true
module Mutations
  class RegisterUser < BaseMutation
    include Authenticatable

    field :user, Types::UserType, null: false

    argument :name, String, required: true
    argument :email, String, required: true
    argument :password, String, required: true
    argument :admin, Boolean, required: true

    def resolve(name:, email:, password:, admin:)
      user = User.create!(name: name, email: email, password: password, admin: admin)

      {
        user: user,
      }
    end
  end
end
