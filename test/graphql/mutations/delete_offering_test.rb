# frozen_string_literal: true
require 'test_helper'

module Mutations
  class DeleteOfferingTest < ActiveSupport::TestCase
    test '#resolve deletes and returns specified offering' do
      offering_to_delete = Offering.first

      query = <<~EOF
        mutation TestMutation {
          deleteOffering(input: {id: #{offering_to_delete.id}}) {
            offering {
              section
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      offering = result.dig('data', 'deleteOffering', 'offering')

      assert_not_nil offering
      assert_equal offering_to_delete.section, offering['section']
    end

    test '#resolve returns nil if specified offering does not exist' do
      query = <<~EOF
        mutation TestMutation {
          deleteOffering(input: {id: 0}) {
            offering {
              section
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      value = result.dig('data', 'deleteOffering', 'offering')

      assert_nil value
    end

    test '#resolve does not delete an offering if the user is not authenticated' do
      offering_to_delete = Offering.first

      query = <<~EOF
        mutation TestMutation {
          deleteOffering(input: {id: #{offering_to_delete.id}}) {
            offering {
              section
            }
          }
        }
      EOF

      CmsSchema.execute(query, context: {}, variables: {}).to_h
      offering = Offering.find_by(id: offering_to_delete.id)

      assert offering.present?
    end

    test '#resolve does not delete an offering if the current user is not an admin' do
      offering_to_delete = Offering.first

      query = <<~EOF
        mutation TestMutation {
          deleteOffering(input: {id: #{offering_to_delete.id}}) {
            offering {
              section
            }
          }
        }
      EOF

      CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      offering = Offering.find_by(id: offering_to_delete.id)

      assert offering.present?
    end
  end
end
