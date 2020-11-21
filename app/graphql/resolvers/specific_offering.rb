# frozen_string_literal: true
module Resolvers
  class SpecificOffering < Resolvers::Base
    include Authenticatable

    type Types::OfferingType, null: true

    def resolve(id:)
      assert_authenticated!

      Offering.find_by(id: id)
    end
  end
end
