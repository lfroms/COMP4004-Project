# frozen_string_literal: true
module Resolvers
  class SpecificTerm < Resolvers::Base
    type Types::TermType, null: true

    def resolve(id:)
      Term.find_by(id: id)
    end
  end
end
