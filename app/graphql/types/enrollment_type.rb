# frozen_string_literal: true
module Types
  class EnrollmentType < Types::BaseObject
    field :id, ID, null: false
    field :role, String, null: false
    field :user, Types::UserType, null: false
    field :offering, Types::OfferingType, null: false
    field :deleted_at, GraphQL::Types::ISO8601DateTime, null: true
  end
end
