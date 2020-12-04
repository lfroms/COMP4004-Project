# frozen_string_literal: true
require 'test_helper'

module Resolvers
  class SpecificDeliverableTest < ActiveSupport::TestCase
    test '#resolve returns specified deliverable' do
      deliverable = deliverables(:one)
      query = <<~EOF
        query Deliverable {
          deliverable(id: #{deliverable.id}) {
            title
            description
            weight
            dueDate
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      deliverable_result = results.dig('data', 'deliverable')

      assert_equal deliverable.title, deliverable_result['title']
      assert_equal deliverable.description, deliverable_result['description']
      assert_equal deliverable.weight, deliverable_result['weight']
      assert_equal deliverable.due_date, deliverable_result['dueDate']
    end

    test '#resolve does not return specified deliverable if user is not enrolled in the offering' do
      deliverable = deliverables(:one)
      query = <<~EOF
        query Deliverable {
          deliverable(id: #{deliverable.id}) {
            title
            description
            weight
            dueDate
          }
        }
      EOF

      unenrolled_user = User.new(name: 'test', email: 'test@email.com', password: '123456')

      result = CmsSchema.execute(query, context: { current_user: unenrolled_user }, variables: {}).to_h
      deliverable = result.dig('data', 'deliverable')

      assert_nil deliverable
    end

    test '#resolve returns specified deliverable if user is an admin' do
      deliverable = deliverables(:one)
      query = <<~EOF
        query Deliverable {
          deliverable(id: #{deliverable.id}) {
            title
            description
            weight
            dueDate
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      deliverable_result = result.dig('data', 'deliverable')

      assert_equal deliverable.title, deliverable_result['title']
      assert_equal deliverable.description, deliverable_result['description']
      assert_equal deliverable.weight, deliverable_result['weight']
      assert_equal deliverable.due_date, deliverable_result['dueDate']
    end

    test '#resolve does not return deliverable when id does not exist' do
      query = <<~EOF
        query Deliverable {
          deliverable(id: 0) {
            title
            description
            weight
            dueDate
          }
        }
      EOF

      result = CmsSchema.execute(query, variables: {}).to_h
      deliverable = result.dig('data', 'deliverable')

      assert_nil deliverable
    end
  end
end
