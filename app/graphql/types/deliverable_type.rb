# frozen_string_literal: true
module Types
  class DeliverableType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :description, String, null: false
    field :weight, Float, null: false
    field :due_date, GraphQL::Types::ISO8601DateTime, null: false
    field :due_date_passed, Boolean, null: false
    field :offering, Types::OfferingType, null: false
    field :has_submissions, Boolean, null: false
    field :submissions, Types::SubmissionType.connection_type, null: false do
      argument :user_id, ID, required: false
    end

    def submissions(args = nil)
      return object.submissions unless args

      object.submissions.where(args)
    end
  end
end
