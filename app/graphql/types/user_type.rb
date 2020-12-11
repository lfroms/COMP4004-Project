# frozen_string_literal: true
module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :admin, Boolean, null: false
    field :approved, Boolean, null: false
    field :can_self_enroll, Boolean, null: false
    field :fees, Float, null: false
    field :groups, Types::GroupType.connection_type, null: false

    field :enrollments, Types::EnrollmentType.connection_type, null: false do
      argument :offering_id, ID, required: false
      argument :role, Types::EnrollmentRoleType, required: false
      argument :including_dropped, Boolean, required: false
    end

    def enrollments(args = nil)
      return object.enrollments.where(deleted_at: nil) unless args

      including_dropped = args.delete(:including_dropped)
      return object.enrollments.where(args) if including_dropped

      object.enrollments.where(deleted_at: nil).where(args)
    end

    field :submissions, Types::SubmissionType.connection_type, null: false do
      argument :deliverable_id, ID, required: false
    end

    def submissions(args = nil)
      return object.submissions unless args
      object.submissions.where(args)
    end

    def can_self_enroll
      object.can_self_enroll?
    end
  end
end
