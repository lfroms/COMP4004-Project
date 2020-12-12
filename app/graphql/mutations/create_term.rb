# frozen_string_literal: true
module Mutations
  class CreateTerm < BaseMutation
    include Authenticatable

    field :term, Types::TermType, null: true
    field :errors, [Types::UserError], null: false

    argument :start_date, GraphQL::Types::ISO8601DateTime, required: true
    argument :end_date, GraphQL::Types::ISO8601DateTime, required: true
    argument :registration_deadline, GraphQL::Types::ISO8601DateTime, required: true
    argument :withdrawal_deadline, GraphQL::Types::ISO8601DateTime, required: true
    argument :per_credit_fee, Float, required: true

    def resolve(start_date:, end_date:, registration_deadline:, withdrawal_deadline:, per_credit_fee:)
      assert_authenticated!
      assert_admin_user!

      term = Term.new(
        start_date: start_date,
        end_date: end_date,
        registration_deadline: registration_deadline,
        withdrawal_deadline: withdrawal_deadline,
        per_credit_fee: per_credit_fee
      )

      if term.save
        {
          term: term,
          errors: [],
        }
      else
        {
          term: nil,
          errors: Types::UserError.from(term.errors_hash),
        }
      end
    end
  end
end
