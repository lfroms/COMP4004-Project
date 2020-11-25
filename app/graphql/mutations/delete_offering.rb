# frozen_string_literal: true
module Mutations
  class DeleteOffering < BaseMutation
    include Authenticatable

    field :offering, Types::OfferingType, null: true

    argument :id, ID, required: true

    def resolve(id:)
      assert_authenticated!
      assert_admin_user!

      offering = Offering.find_by(id: id)

      {
        offering: offering&.destroy,
      }
    end
  end
end
