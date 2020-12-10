# frozen_string_literal: true
module Mutations
  class RemoveUserFromGroup < BaseMutation
    include Authenticatable

    field :user, Types::UserType, null: true
    field :group, Types::GroupType, null: true
    field :errors, [Types::UserError], null: false

    argument :user_id, ID, required: true
    argument :group_id, ID, required: true

    def resolve(user_id:, group_id:)
      assert_authenticated!
      assert_admin_user!

      user = User.find_by(id: user_id)
      group = Group.find_by(id: group_id)

      unless user || group
        return {
          user: nil,
          group: nil,
          errors: Types::UserError.from("Could not find user with id #{user_id} and group with id #{group_id}."),
        }
      end

      unless user
        return {
          user: nil,
          group: group,
          errors: Types::UserError.from("Could not find user with id #{user_id}."),
        }
      end

      unless group
        return {
          user: user,
          group: nil,
          errors: Types::UserError.from("Could not find group with id #{group_id}."),
        }
      end

      membership = user.user_groups.find_by(group_id: group_id)

      unless membership
        return {
          user: user,
          group: group,
          errors: Types::UserError.from("#{user.name} is not a member of #{group.name}."),
        }
      end

      if membership.destroy
        {
          user: user,
          group: group,
          errors: [],
        }
      else
        {
          user: user,
          group: group,
          errors: Types::UserError.from(membership.errors_hash),
        }
      end
    end
  end
end
