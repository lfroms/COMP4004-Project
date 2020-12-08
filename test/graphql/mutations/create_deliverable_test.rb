# frozen_string_literal: true
require 'test_helper'

module Mutations
  class CreateDeliverableTest < ActiveSupport::TestCase
    test '#resolve creates a new deliverable and saves it to the db' do
      offering_id = offerings(:object_oriented_section_a).id

      query = <<~EOF
        mutation CreateDeliverable {
          createDeliverable(input:
            {
              title: "Assignment 3",
              description: "this is important",
              weight: 0.15,
              dueDate: "2020-12-01T04:05:06Z"
              offeringId: #{offering_id}
            }) {
            deliverable {
              id
              title
              description
              weight
              dueDate
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:bob) }, variables: {}).to_h
      id = result.dig('data', 'createDeliverable', 'deliverable', 'id')
      deliverable = Deliverable.find(id)

      assert_equal 'Assignment 3', deliverable.title
      assert_equal 'this is important', deliverable.description
      assert_equal 0.15, deliverable.weight
      assert_equal Time.zone.local(2020, 12, 1, 4, 5, 6), deliverable.due_date
    end

    test '#resolve cannot create a deliverable if user is not offering professor' do
      offering_id = offerings(:quality_assurance_section_a).id

      query = <<~EOF
        mutation CreateDeliverable {
          createDeliverable(input:
            {
              title: "Assignment 3",
              description: "this is important",
              weight: 0.15,
              dueDate: "2020-12-01T04:05:06Z"
              offeringId: #{offering_id}
            }) {
            deliverable {
              id
              title
              description
              weight
              dueDate
            }

            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      deliverable = result.dig('data', 'createDeliverable', 'deliverable')
      error_message = result.dig('data', 'createDeliverable', 'errors', 0, 'message')

      assert_nil deliverable
      assert_equal 'You do not have permission to perform this action.', error_message
    end

    test '#resolve does not create a new deliverable if id offering is not valid' do
      query = <<~EOF
        mutation CreateDeliverable {
          createDeliverable(input:
            {
              title: "Assignment 3",
              description: "this is important",
              weight: 0.15,
              dueDate: "2020-12-01T04:05:06Z"
              offeringId: 0
            }) {
            deliverable {
              id
              title
              description
              weight
              dueDate
            }

            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      deliverable = result.dig('data', 'createDeliverable', 'deliverable')
      error_message = result.dig('data', 'createDeliverable', 'errors', 0, 'message')

      assert_nil deliverable
      assert_equal 'You do not have permission to perform this action.', error_message
    end

    test '#resolve does not create a new deliverable if title is omitted' do
      query = <<~EOF
        mutation CreateDeliverable {
          createDeliverable(input:
            {
              description: "this is important",
              weight: 0.15,
              dueDate: "2020-12-01T04:05:06Z"
              offeringId: 0
            }) {
            deliverable {
              id
              title
              description
              weight
              dueDate
            }

            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      error_message = result.dig('errors', 0, 'message')

      assert_equal "Argument 'title' on InputObject 'CreateDeliverableInput' is required. Expected type String!",
        error_message
    end

    test '#resolve does not create a new deliverable if description is omitted' do
      query = <<~EOF
        mutation CreateDeliverable {
          createDeliverable(input:
            {
              title: "Assignment 3"
              weight: 0.15,
              dueDate: "2020-12-01T04:05:06Z"
              offeringId: 0
            }) {
            deliverable {
              id
              title
              description
              weight
              dueDate
            }

            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      error_message = result.dig('errors', 0, 'message')

      assert_equal "Argument 'description' on InputObject 'CreateDeliverableInput' is required. Expected type String!",
        error_message
    end

    test '#resolve does not create a new deliverable if weight is omitted' do
      query = <<~EOF
        mutation CreateDeliverable {
          createDeliverable(input:
            {
              title: "Assignment 3"
              description: "this is important"
              dueDate: "2020-12-01T04:05:06Z"
              offeringId: 0
            }) {
            deliverable {
              id
              title
              description
              weight
              dueDate
            }

            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      error_message = result.dig('errors', 0, 'message')

      assert_equal "Argument 'weight' on InputObject 'CreateDeliverableInput' is required. Expected type Float!",
        error_message
    end

    test '#resolve does not create a new deliverable if dueDate is omitted' do
      query = <<~EOF
        mutation CreateDeliverable {
          createDeliverable(input:
            {
              title: "Assignment 3"
              description: "this is important"
              weight: 0.15
              offeringId: 0
            }) {
            deliverable {
              id
              title
              description
              weight
              dueDate
            }

            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      error_message = result.dig('errors', 0, 'message')

      assert_equal(
        "Argument 'dueDate' on InputObject 'CreateDeliverableInput' is required. Expected type ISO8601DateTime!",
        error_message
      )
    end
  end
end
