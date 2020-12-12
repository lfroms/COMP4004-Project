# frozen_string_literal: true
require 'test_helper'

module Mutations
  class DeleteTermTest < ActiveSupport::TestCase
    test '#resolve deletes and returns specified term' do
      term_to_delete = terms(:fall)

      query = <<~EOF
        mutation DeleteTerm($id: ID!) {
          deleteTerm(input: {id: $id}) {
            term {
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
         context: { current_user: users(:admin) },
          variables: {
            id: term_to_delete.id,
          }
      ).to_h

      term = result.dig('data', 'deleteTerm', 'term')

      assert_not_nil term
      assert_nil Term.find_by(id: term_to_delete.id)
    end

    test '#resolve returns nil and error message if specified term does not exist' do
      query = <<~EOF
        mutation DeleteTerm($id: ID!) {
          deleteTerm(input: {id: $id}) {
            term {
              id
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: { id: 0 }).to_h
      value = result.dig('data', 'deleteTerm', 'term')
      error_message = result.dig('data', 'deleteTerm', 'errors', 0, 'message')

      assert_equal 'Could not find term with id 0.', error_message
      assert_nil value
    end

    test '#resolve does not delete a term if the user is not authenticated' do
      term_to_delete = terms(:fall)

      query = <<~EOF
        mutation DeleteTerm($id: ID!) {
          deleteTerm(input: {id: $id}) {
              term {
                id
              }
            }
          }
      EOF

      CmsSchema.execute(query, context: {}, variables: { id: term_to_delete.id }).to_h
      term = Term.find_by(id: term_to_delete.id)

      assert term.present?
    end

    test '#resolve does not delete a user if the current user is not an admin' do
      term_to_delete = terms(:fall)

      query = <<~EOF
        mutation DeleteTerm($id: ID!) {
          deleteTerm(input: {id: $id}) {
              term {
                id
              }
            }
          }
      EOF

      CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: { id: term_to_delete.id }).to_h
      term = Term.find_by(id: term_to_delete.id)

      assert term.present?
    end
  end
end
