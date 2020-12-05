# frozen_string_literal: true
module Mutations
  class CreateDeliverable < BaseMutation
    include Authenticatable

    field :deliverable, Types::DeliverableType, null: true
    field :errors, [Types::UserError], null: false

    argument :title, String, required: true
    argument :description, String, required: true
    argument :weight, Float, required: true
    argument :due_date, GraphQL::Types::ISO8601DateTime, required: true
    argument :offering_id, ID, required: true

    def resolve(title:, description:, weight:, due_date:, offering_id:)
      assert_authenticated!

      deliverable = Deliverable.new(
        title: title,
        description: description,
        weight: weight,
        due_date: due_date,
        offering_id: offering_id
      )

      unless user_is_offering_instructor(offering_id)
        return {
          deliverable: nil,
          errors: Types::UserError.from('You do not have permission to perform this action.'),
        }
      end

      if deliverable.save
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
      context[:current_user].enrollments.find_by(offering_id: offering_id)&.role == 'professor'
    end
  end
end
