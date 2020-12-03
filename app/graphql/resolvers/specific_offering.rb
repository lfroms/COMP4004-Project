# frozen_string_literal: true
module Resolvers
  class SpecificOffering < Resolvers::Base
    include Authenticatable

    type Types::OfferingType, null: true

    def resolve(id:)
      assert_authenticated!

      offering = Offering.find_by(id: id)
      return nil unless offering
      return nil unless user_can_access_offering(offering)

      offering
    end

    private

    def user_can_access_offering(offering)
      context[:current_user].admin || offering.participants.include?(context[:current_user])
    end
  end
end
