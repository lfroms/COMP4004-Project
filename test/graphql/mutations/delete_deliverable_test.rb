# frozen_string_literal: true
require 'test_helper'

module Mutations
  class DeleteDeliverableTest < ActiveSupport::TestCase
    test '#resolve deletes a deliverable' do
      offering = offerings(:object_oriented_section_a)
      deliverable = offering.deliverables.first

      query = <<~EOF
        mutation DeleteDeliverable($id: ID!) {
          deleteDeliverable(input: {id: $id}) {
            deliverable {
              id
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:bob) }, variables: { id: deliverable.id }).to_h
      id = result.dig('data', 'deleteDeliverable', 'deliverable', 'id')

      assert_nil Deliverable.find_by(id: id)
    end

    test '#resolve does not delete a deliverable if the user is not enrolled as a professor in the offering' do
      offering = offerings(:quality_assurance_section_a)
      deliverable = offering.deliverables.first

      query = <<~EOF
        mutation DeleteDeliverable($id: ID!) {
          deleteDeliverable(input: {id: $id}) {
            deliverable {
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(
        query,
        context: { current_user: users(:not_admin) },
        variables: {
          id: deliverable.id,
        }
      ).to_h

      error_message = result.dig('data', 'deleteDeliverable', 'errors', 0, 'message')

      assert_not_nil Deliverable.find_by(id: deliverable.id)
      assert_equal 'You do not have permission to perform this action.', error_message
    end

    test '#resolve does not delete a deliverable if the user is not authenticated' do
      offering = offerings(:object_oriented_section_a)
      deliverable = offering.deliverables.first

      query = <<~EOF
        mutation DeleteDeliverable($id: ID!) {
          deleteDeliverable(input: {id: $id}) {
            deliverable {
              id
            }
          }
        }
      EOF

      CmsSchema.execute(query, context: {}, variables: { id: deliverable.id }).to_h
      assert_not_nil Deliverable.find_by(id: deliverable.id)
    end
  end
end
