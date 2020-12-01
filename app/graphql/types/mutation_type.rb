# frozen_string_literal: true
module Types
  class MutationType < Types::BaseObject
    field :authenticate, mutation: Mutations::Authenticate

    field :create_user, mutation: Mutations::CreateUser
    field :delete_user, mutation: Mutations::DeleteUser
    field :register_user, mutation: Mutations::RegisterUser

    field :create_course, mutation: Mutations::CreateCourse
    field :update_course, mutation: Mutations::UpdateCourse
    field :delete_course, mutation: Mutations::DeleteCourse

    field :create_offering, mutation: Mutations::CreateOffering
    field :delete_offering, mutation: Mutations::DeleteOffering

    field :create_term, mutation: Mutations::CreateTerm

    field :create_enrollment, mutation: Mutations::CreateEnrollment
    field :delete_enrollment, mutation: Mutations::DeleteEnrollment
  end
end
