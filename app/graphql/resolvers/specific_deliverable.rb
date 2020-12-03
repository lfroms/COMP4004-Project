# frozen_string_literal: true
module Resolvers
  class SpecificDeliverable < Resolvers::Base
    include Authenticatable

    type Types::DeliverableType, null: true

    def resolve(id:)
      assert_authenticated!
      deliverable = Deliverable.find_by(id: id)

      byebug
      return nil unless deliverable
      return nil unless user_can_access_offering(deliverable.offering)

      deliverable
    end

    private

    def user_can_access_offering(offering)
      context[:current_user].admin || offering.participants.include?(context[:current_user])
    end
  end
end
