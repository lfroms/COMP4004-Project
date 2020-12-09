# frozen_string_literal: true
module Types
  class OfferingType < Types::BaseObject
    field :id, ID, null: false
    field :section, String, null: false
    field :capacity, Integer, null: false
    field :course, Types::CourseType, null: false
    field :term, Types::TermType, null: false
    field :enrollments, Types::EnrollmentType.connection_type, null: false do
      argument :user_id, ID, required: false
      argument :role, Types::EnrollmentRoleType, required: false
    end
    field :full, Boolean, null: false
    field :deliverables, Types::DeliverableType.connection_type, null: false

    def enrollments(args = nil)
      return object.enrollments unless args

      object.enrollments.where(args)
    end

    def full
      object.full?
    end
  end
end
