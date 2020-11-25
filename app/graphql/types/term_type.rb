# frozen_string_literal: true
module Types
  class TermType < Types::BaseObject
    field :id, ID, null: false
    field :start_date, GraphQL::Types::ISO8601DateTime, null: false
    field :end_date, GraphQL::Types::ISO8601DateTime, null: false
    field :registration_deadline, GraphQL::Types::ISO8601DateTime, null: false
    field :withdrawal_deadline, GraphQL::Types::ISO8601DateTime, null: false
    field :financial_deadline, GraphQL::Types::ISO8601DateTime, null: false
    field :offerings, Types::OfferingType.connection_type, null: false
  end
end
