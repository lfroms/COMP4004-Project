# frozen_string_literal: true
module Resolvers
  class Groups < Resolvers::Base
    type Types::GroupType.connection_type, null: true

    def resolve
      Group.all
    end
  end
end
