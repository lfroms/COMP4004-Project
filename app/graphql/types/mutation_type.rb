# frozen_string_literal: true
module Types
  class MutationType < Types::BaseObject
    field :authenticate, mutation: Mutations::Authenticate

    field :create_user, mutation: Mutations::CreateUser
    field :delete_user, mutation: Mutations::DeleteUser

    field :create_course, mutation: Mutations::CreateCourse
    field :delete_course, mutation: Mutations::DeleteCourse

    field :create_offering, mutation: Mutations::CreateOffering
    field :delete_offering, mutation: Mutations::DeleteOffering
  end
end
