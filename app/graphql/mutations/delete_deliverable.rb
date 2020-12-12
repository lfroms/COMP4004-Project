# frozen_string_literal: true
module Mutations
  class DeleteDeliverable < BaseMutation
    include Authenticatable

    field :deliverable, Types::DeliverableType, null: true
    field :errors, [Types::UserError], null: false

    argument :id, ID, required: true

    def resolve(id:)
      assert_authenticated!

      deliverable = Deliverable.find_by(id: id)

      unless user_is_offering_instructor(deliverable.offering.id)
        return {
          deliverable: nil,
          errors: Types::UserError.from('You do not have permission to perform this action.'),
        }
      end

      if deliverable.has_submissions
        return {
          deliverable: nil,
          errors: Types::UserError.from('This deliverable cannot be deleted as it has submissions.'),
        }
      end

      if deliverable.destroy
        {
          deliverable: deliverable,
          errors: [],
        }
      else
        {
          deliverable: nil,
          errors: Types::UserError.from(deliverable.errors_hash),
        }
      end
    end

    private

    def user_is_offering_instructor(offering_id)
      context[:current_user].enrollments.professor.find_by(offering_id: offering_id)
    end
  end
end
