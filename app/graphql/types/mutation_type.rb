# frozen_string_literal: true
module Types
  class MutationType < Types::BaseObject
    field :create_user, mutation: Mutations::CreateUser
    field :authenticate, mutation: Mutations::Authenticate

    field :deleteUser, mutation: Mutations::DeleteUser
  end
end
