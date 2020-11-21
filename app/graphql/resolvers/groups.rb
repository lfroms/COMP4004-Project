# frozen_string_literal: true
module Resolvers
  class Groups < Resolvers::Base
    include Authenticatable

    type Types::GroupType.connection_type, null: false

    def resolve
      assert_authenticated!
      assert_admin_user!

      Group.all
    end
  end
end
