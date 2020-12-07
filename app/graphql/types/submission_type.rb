# frozen_string_literal: true
module Types
  class SubmissionType < Types::BaseObject
    field :id, ID, null: false
    field :attachment_url, String, null: false
    field :user, Types::UserType, null: false
    field :deliverable, Types::DeliverableType, null: false
  end
end
