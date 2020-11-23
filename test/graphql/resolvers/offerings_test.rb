# frozen_string_literal: true
require 'test_helper'

module Resolvers
  class OfferingsTest < ActiveSupport::TestCase
    test '#resolve returns all offerings' do
      query = <<~EOF
        query Offerings {
          offerings {
            edges {
              node {
                section
              }
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      offerings = results.dig('data', 'offerings', 'edges')

      assert_equal 3, offerings.length
    end

    test '#resolve does not return anything if the current user is not authenticated' do
      query = <<~EOF
        query Offerings {
          offerings {
            edges {
              node {
                section
              }
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: {}, variables: {}).to_h
      assert_nil results['data']
    end

    test '#resolve does not return anything if the current user is not an admin' do
      query = <<~EOF
        query Offerings {
          offerings {
            edges {
              node {
                section
              }
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      assert_nil results['data']
    end
  end
end
