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
      argument :including_dropped, Boolean, required: false
    end
    field :full, Boolean, null: false
    field :deliverables, Types::DeliverableType.connection_type, null: false

    def enrollments(args = nil)
      return object.enrollments.where(deleted_at: nil) unless args

      including_dropped = args.delete(:including_dropped)
      return object.enrollments.where(args) if including_dropped

      object.enrollments.where(deleted_at: nil).where(args)
    end

    def full
      object.full?
    end
  end
end
