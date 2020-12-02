# frozen_string_literal: true
module Mutations
  class DeleteOffering < BaseMutation
    include Authenticatable

    field :offering, Types::OfferingType, null: true
    field :errors, [Types::UserError], null: false

    argument :id, ID, required: true

    def resolve(id:)
      assert_authenticated!
      assert_admin_user!

      offering = Offering.find_by(id: id)

      unless offering
        return {
          offering: nil,
          errors: Types::UserError.from("Could not find offering with id #{id}."),
        }
      end

      if offering.destroy
        {
          offering: offering,
          errors: [],
        }
      else
        {
          offering: nil,
          errors: Types::UserError.from(offering.errors_hash),
        }
      end
    end
  end
end
