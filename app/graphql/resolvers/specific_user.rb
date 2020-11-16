# frozen_string_literal: true
module Resolvers
  class SpecificUser < Resolvers::Base
    type Types::UserType, null: true

    def resolve(id:)
      User.find_by(id: id)
    end
  end
end
