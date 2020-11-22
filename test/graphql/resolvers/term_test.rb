# frozen_string_literal: true
require 'test_helper'

module Resolvers
  class TermTest < ActiveSupport::TestCase
    test '#resolve returns specified term' do
      term_id = Term.last.id
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
      assert_equal terms(:one).start_date, term['startDate']
      assert_equal terms(:one).end_date, term['endDate']
      assert_equal terms(:one).financial_deadline, term['financialDeadline']
      assert_equal terms(:one).registration_deadline, term['registrationDeadline']
      assert_equal terms(:one).withdrawal_deadline, term['withdrawalDeadline']
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
  end
end
