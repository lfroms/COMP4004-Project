# frozen_string_literal: true
module Types
  class SubmissionType < Types::BaseObject
    field :id, ID, null: false
    field :attachment_url, String, null: false
    field :user, Types::UserType, null: false
    field :deliverable, Types::DeliverableType, null: false
    field :grade, Types::GradeType, null: true

    def self.authorized?(object, context)
      super && (
        context[:current_user].admin ||
        object.user == context[:current_user] ||
        object.deliverable.offering.enrollments.professor.find_by(user: context[:current_user])
      )
    end
  end
end
