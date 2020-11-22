# frozen_string_literal: true
module Types
  class MutationType < Types::BaseObject
    field :authenticate, mutation: Mutations::Authenticate

    field :create_user, mutation: Mutations::CreateUser
    field :delete_user, mutation: Mutations::DeleteUser

    field :create_course, mutation: Mutations::CreateCourse
  end
end
