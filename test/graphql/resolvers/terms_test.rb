# frozen_string_literal: true
require 'test_helper'

module Resolvers
  class TermsTest < ActiveSupport::TestCase
    test '#resolve returns all saved terms' do
      query = <<~EOF
        query Terms {
          terms {
            nodes {
              startDate
              endDate
              financialDeadline
              registrationDeadline
              withdrawalDeadline
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      terms = results.dig('data', 'terms', 'nodes')

      assert_equal 2, terms.length
      assert_equal terms(:one).start_date, terms[0]['startDate']
      assert_equal terms(:one).end_date, terms[0]['endDate']
      assert_equal terms(:one).financial_deadline, terms[0]['financialDeadline']
      assert_equal terms(:one).registration_deadline, terms[0]['registrationDeadline']
      assert_equal terms(:one).withdrawal_deadline, terms[0]['withdrawalDeadline']
    end

    test '#resolve does not return anything if the current user is not authenticated' do
      query = <<~EOF
        query Terms {
          terms {
            nodes {
              startDate
              endDate
              financialDeadline
              registrationDeadline
              withdrawalDeadline
            }
          }
        }
      EOF

      results = CmsSchema.execute(query, context: {}, variables: {}).to_h

      assert_nil results.dig('data', 'terms')
    end
  end
end
