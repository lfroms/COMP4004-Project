# frozen_string_literal: true
module Mutations
  class DeleteUser < BaseMutation
    field :user, Types::UserType, null: true

    argument :id, ID, required: true

    def resolve(id:)
      user = User.find_by(id: id)

      {
        user: user&.destroy,
      }
    end
  end
end
