# frozen_string_literal: true
module Resolvers
  class Users < Resolvers::Base
    include Authenticatable

    type Types::UserType.connection_type, null: false

    def resolve
      assert_authenticated!
      assert_admin_user!

      User.all
    end
  end
end
