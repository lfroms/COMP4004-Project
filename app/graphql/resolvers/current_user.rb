# frozen_string_literal: true
module Resolvers
  class CurrentUser < Resolvers::Base
    include Authenticatable

    type Types::UserType, null: true

    def resolve
      assert_authenticated!

      context[:current_user]
    end
  end
end
