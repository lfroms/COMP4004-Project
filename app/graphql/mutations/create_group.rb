# frozen_string_literal: true
module Mutations
  class CreateGroup < BaseMutation
    include Authenticatable

    field :group, Types::GroupType, null: true
    field :errors, [Types::UserError], null: false

    argument :name, String, required: true
    argument :can_self_enroll, Boolean, required: true

    def resolve(name:, can_self_enroll:)
      assert_authenticated!
      assert_admin_user!

      group = Group.new(name: name, can_self_enroll: can_self_enroll)

      if group.save
        {
          group: group,
          errors: [],
        }
      else
        {
          group: nil,
          errors: Types::UserError.from(group.errors_hash),
        }
      end
    end
  end
end
