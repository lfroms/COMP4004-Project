# frozen_string_literal: true
module Mutations
  class CreateOffering < BaseMutation
    include Authenticatable

    field :offering, Types::OfferingType, null: false

    argument :section, String, required: true
    argument :course_id, ID, required: true
    argument :term_id, ID, required: true

    def resolve(section:, course_id:, term_id: [])
      assert_authenticated!
      assert_admin_user!

      offering = Offering.create!(section: section, course_id: course_id, term_id: term_id)

      {
        offering: offering,
      }
    end
  end
end
