# frozen_string_literal: true
module Mutations
  class UpdateGroup < BaseMutation
    include Authenticatable

    field :group, Types::GroupType, null: true
    field :errors, [Types::UserError], null: false

    argument :id, ID, required: true
    argument :name, String, required: false
    argument :can_self_enroll, Boolean, required: false

    def resolve(args)
      assert_authenticated!
      assert_admin_user!

      filtered_args = args.compact

      group = Group.find_by(id: filtered_args[:id])

      unless group
        return {
          group: nil,
          errors: Types::UserError.from("Could not find group with id #{filtered_args[:id]}."),
        }
      end

      if group.update(filtered_args)
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
