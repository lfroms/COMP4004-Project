# frozen_string_literal: true
module Resolvers
  class Terms < Resolvers::Base
    type Types::TermType.connection_type, null: false

    def resolve
      Term.all
    end
  end
end
