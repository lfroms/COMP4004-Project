# frozen_string_literal: true
module Types
  class OfferingType < Types::BaseObject
    field :id, ID, null: false
    field :section, String, null: false
    field :capacity, Integer, null: false
    field :course, Types::CourseType, null: false
    field :term, Types::TermType, null: false
    field :enrollments, Types::EnrollmentType.connection_type, null: false
    field :full, Boolean, null: false
    field :deliverables, Types::DeliverableType.connection_type, null: false

    def full
      object.full?
    end
  end
end
