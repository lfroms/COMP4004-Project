# frozen_string_literal: true
module Resolvers
  class SpecificTerm < Resolvers::Base
    include Authenticatable

    type Types::TermType, null: true

    def resolve(id:)
      assert_authenticated!

      Term.find_by(id: id)
    end
  end
end
