# frozen_string_literal: true
require 'test_helper'

module Resolvers
  class SpecificTermTest < ActiveSupport::TestCase
    test '#resolve returns specified term' do
      term_id = terms(:fall).id
      query = <<~EOF
        query Term {
          term(id: #{term_id}) {
            startDate
            endDate
            financialDeadline
            registrationDeadline
            withdrawalDeadline
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      term = results.dig('data', 'term')
      assert_equal terms(:fall).start_date, term['startDate']
      assert_equal terms(:fall).end_date, term['endDate']
      assert_equal terms(:fall).financial_deadline, term['financialDeadline']
      assert_equal terms(:fall).registration_deadline, term['registrationDeadline']
      assert_equal terms(:fall).withdrawal_deadline, term['withdrawalDeadline']
    end

    test '#resolve returns nil when specified term does not exist' do
      query = <<~EOF
        query Term {
          term(id: 0) {
            startDate
            endDate
            financialDeadline
            registrationDeadline
            withdrawalDeadline
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      value = results.dig('data', 'term')

      assert_nil value
    end

    test '#resolve does not return anything if the current user is not authenticated' do
      term_id = terms(:fall)

      query = <<~EOF
        query Term {
          term(id: #{term_id}) {
            startDate
            endDate
            financialDeadline
            registrationDeadline
            withdrawalDeadline
          }
        }
      EOF

      results = CmsSchema.execute(query, context: {}, variables: {}).to_h
      value = results.dig('data', 'term')

      assert_nil value
    end
  end
end
