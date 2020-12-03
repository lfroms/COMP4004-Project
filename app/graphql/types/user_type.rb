# frozen_string_literal: true
module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :admin, Boolean, null: false
    field :approved, Boolean, null: false
    field :enrollments, Types::EnrollmentType.connection_type, null: false
  end
end
