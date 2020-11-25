# frozen_string_literal: true
module Mutations
  class CreateTerm < BaseMutation
    include Authenticatable

    field :term, Types::TermType, null: false

    argument :start_date, GraphQL::Types::ISO8601DateTime, required: true
    argument :end_date, GraphQL::Types::ISO8601DateTime, required: true
    argument :registration_deadline, GraphQL::Types::ISO8601DateTime, required: true
    argument :withdrawal_deadline, GraphQL::Types::ISO8601DateTime, required: true
    argument :financial_deadline, GraphQL::Types::ISO8601DateTime, required: true

    def resolve(start_date:, end_date:, registration_deadline:, withdrawal_deadline:, financial_deadline:)
      assert_authenticated!
      assert_admin_user!

      term = Term.create!(
        start_date: start_date,
        end_date: end_date,
        registration_deadline: registration_deadline,
        withdrawal_deadline: withdrawal_deadline,
        financial_deadline: financial_deadline
      )

      {
        term: term,
      }
    end
  end
end
