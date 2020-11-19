# frozen_string_literal: true
module Resolvers
  class Users < Resolvers::Base
    type Types::UserType.connection_type, null: false

    def resolve
      User.all
    end
  end
end
