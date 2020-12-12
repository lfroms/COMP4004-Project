# frozen_string_literal: true
module Mutations
  class DeleteTerm < BaseMutation
    include Authenticatable

    field :term, Types::TermType, null: true
    field :errors, [Types::UserError], null: false

    argument :id, ID, required: true

    def resolve(id:)
      assert_authenticated!
      assert_admin_user!

      term = Term.find_by(id: id)

      unless term
        return {
          term: nil,
          errors: Types::UserError.from("Could not find term with id #{id}."),
        }
      end

      if term.destroy
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
