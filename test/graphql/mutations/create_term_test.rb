# frozen_string_literal: true
require 'test_helper'

module Mutations
  class CreateTermTest < ActiveSupport::TestCase
    test '#resolve creates a new term and saves it to the database' do
      query = <<~EOF
        mutation test {
          createTerm(input:{
            startDate: "2020-09-01T04:05:06Z"
            endDate: "2020-12-01T04:05:06Z"
            registrationDeadline: "2020-09-01T04:05:06Z"
            withdrawalDeadline: "2020-09-10T04:05:06Z"
          }) {
            term {
              id
              startDate
              endDate
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      id = result.dig('data', 'createTerm', 'term', 'id')

      term = Term.find(id)

      assert_equal Time.zone.local(2020, 9, 1, 4, 5, 6), term.start_date
      assert_equal Time.zone.local(2020, 12, 1, 4, 5, 6), term.end_date
    end

    test '#resolve does not create a new term when one of the fields is not supplied' do
      query = <<~EOF
        mutation test {
          createTerm(input:{
            endDate: "2020-12-01T04:05:06Z"
            registrationDeadline: "2020-09-01T04:05:06Z"
            withdrawalDeadline: "2020-09-10T04:05:06Z"
          }) {
            term {
              id
              startDate
              endDate
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      id = result.dig('data', 'createTerm', 'term', 'id')

      term = Term.find_by(id: id)

      assert_nil term
    end

    test '#resolve does not create a new term if the user is not authenticated' do
      query = <<~EOF
        mutation test {
          createTerm(input:{
            startDate: "2020-09-01T04:05:06Z"
            endDate: "2020-12-01T04:05:06Z"
            registrationDeadline: "2020-09-01T04:05:06Z"
            withdrawalDeadline: "2020-09-10T04:05:06Z"
          }) {
            term {
              id
              startDate
              endDate
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, variables: {}).to_h
      id = result.dig('data', 'createTerm', 'term', 'id')

      term = Term.find_by(id: id)

      assert_nil term
    end

    test '#resolve does not create a new term if the user is not an admin' do
      query = <<~EOF
        mutation test {
          createTerm(input:{
            startDate: "2020-09-01T04:05:06Z"
            endDate: "2020-12-01T04:05:06Z"
            registrationDeadline: "2020-09-01T04:05:06Z"
            withdrawalDeadline: "2020-09-10T04:05:06Z"
          }) {
            term {
              id
              startDate
              endDate
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      id = result.dig('data', 'createTerm', 'term', 'id')

      term = Term.find_by(id: id)

      assert_nil term
    end
  end
end
