# frozen_string_literal: true
module Mutations
  class DeleteUser < BaseMutation
    argument :id, Integer, required: true

    def resolve(id:)
      user = User.find(id)

      if user
        User.delete(id)
      end
    end
  end
end
