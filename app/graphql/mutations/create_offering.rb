# frozen_string_literal: true
module Mutations
  class CreateOffering < BaseMutation
    include Authenticatable

    field :offering, Types::OfferingType, null: true
    field :errors, [Types::UserError], null: false

    argument :section, String, required: true
    argument :course_id, ID, required: true
    argument :term_id, ID, required: true
    argument :capacity, Integer, required: true

    def resolve(section:, course_id:, term_id:, capacity:)
      assert_authenticated!
      assert_admin_user!

      offering = Offering.new(section: section, course_id: course_id, term_id: term_id, capacity: capacity)

      if offering.save
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
