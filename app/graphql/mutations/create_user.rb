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
    argument :group_ids, [ID], required: false

    def resolve(name:, email:, password:, admin:, group_ids: [])
      assert_authenticated!
      assert_admin_user!

      groups = Group.where(id: group_ids)
      user = User.new(name: name, email: email, password: password, admin: admin, groups: groups)

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
