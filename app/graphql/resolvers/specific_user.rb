# frozen_string_literal: true
module Resolvers
  class SpecificUser < Resolvers::Base
    include Authenticatable

    type Types::UserType, null: true

    def resolve(id:)
      assert_authenticated!
      assert_admin_user!

      User.find_by(id: id)
    end
  end
end
