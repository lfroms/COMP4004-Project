# frozen_string_literal: true
module Mutations
  class DeleteGroup < BaseMutation
    include Authenticatable

    field :group, Types::GroupType, null: true
    field :errors, [Types::UserError], null: false

    argument :id, ID, required: true

    def resolve(id:)
      assert_authenticated!
      assert_admin_user!

      group = Group.find_by(id: id)

      unless group
        return {
          group: nil,
          errors: Types::UserError.from("Could not find group with id #{id}."),
        }
      end

      if group.destroy
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
