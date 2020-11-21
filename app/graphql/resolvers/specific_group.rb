# frozen_string_literal: true
module Resolvers
  class SpecificGroup < Resolvers::Base
    type Types::GroupType, null: true

    def ready?(*)
      context[:current_user]&.admin
    end

    def resolve(id:)
      Group.find_by(id: id)
    end
  end
end
