# frozen_string_literal: true
module Resolvers
  class SpecificGroup < Resolvers::Base
    type Types::GroupType, null: true

    def resolve(id:)
      Group.find_by(id: id)
    end
  end
end
