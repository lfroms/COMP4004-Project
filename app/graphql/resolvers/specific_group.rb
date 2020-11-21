# frozen_string_literal: true
module Resolvers
  class SpecificGroup < Resolvers::Base
    include Authenticatable

    type Types::GroupType, null: true

    def resolve(id:)
      assert_authenticated!
      assert_admin_user!

      Group.find_by(id: id)
    end
  end
end
