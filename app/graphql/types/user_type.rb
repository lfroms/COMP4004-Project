# frozen_string_literal: true
module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :admin, Boolean, null: false
    field :approved, Boolean, null: false
    field :enrollments, Types::EnrollmentType.connection_type, null: false do
      argument :offering_id, ID, required: false
      argument :role, Types::EnrollmentRoleType, required: false
    end

    def enrollments(args = nil)
      return object.enrollments unless args

      object.enrollments.where(args)
    end
  end
end
