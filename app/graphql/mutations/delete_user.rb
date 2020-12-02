# frozen_string_literal: true
module Mutations
  class DeleteUser < BaseMutation
    include Authenticatable

    field :user, Types::UserType, null: true
    field :errors, [Types::UserError], null: false

    argument :id, ID, required: true

    def resolve(id:)
      assert_authenticated!
      assert_admin_user!

      user = User.find_by(id: id)

      if user == context[:current_user]
        return {
          user: nil,
          errors: Types::UserError.from('You cannot delete your own user account.'),
        }
      end

      unless user
        return {
          user: nil,
          errors: Types::UserError.from("Could not find user with id #{id}."),
        }
      end

      if user.destroy
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
