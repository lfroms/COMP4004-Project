# frozen_string_literal: true
module Resolvers
  class Terms < Resolvers::Base
    include Authenticatable

    type Types::TermType.connection_type, null: false

    def resolve
      assert_authenticated!
      assert_admin_user!

      Term.all
    end
  end
end
