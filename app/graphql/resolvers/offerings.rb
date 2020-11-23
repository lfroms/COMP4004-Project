# frozen_string_literal: true
module Resolvers
  class Offerings < Resolvers::Base
    include Authenticatable

    type Types::OfferingType.connection_type, null: false

    def resolve
      assert_authenticated!
      assert_admin_user!

      Offering.all
    end
  end
end
