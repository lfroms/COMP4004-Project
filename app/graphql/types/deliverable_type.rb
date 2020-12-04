# frozen_string_literal: true
module Types
  class DeliverableType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :description, String, null: false
    field :weight, Float, null: false
    field :due_date, GraphQL::Types::ISO8601DateTime, null: false
    field :offering, Types::OfferingType, null: false
  end
end
