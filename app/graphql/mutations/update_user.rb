# frozen_string_literal: true
module Mutations
  class UpdateUser < BaseMutation
    include Authenticatable

    field :user, Types::UserType, null: true
    field :errors, [Types::UserError], null: false

    argument :id, ID, required: true
    argument :name, String, required: false
    argument :email, String, required: false
    argument :password, String, required: false
    argument :admin, Boolean, required: false
    argument :approved, Boolean, required: false

    def resolve(args)
      assert_authenticated!
      assert_admin_user!

      filtered_args = args.compact

      user = User.find_by(id: filtered_args[:id])
      unless user
        return {
          user: nil,
          errors: Types::UserError.from("Could not find user with id #{filtered_args[:id]}"),
        }
      end

      if user.update(filtered_args)
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
