# frozen_string_literal: true
require 'test_helper'

module Mutations
  class CreateSubmissionTest < ActiveSupport::TestCase
    test '#resolve creates a new submission' do
      deliverable = deliverables(:first_deliverable)

      query = <<~EOF
        mutation CreateSubmission {
          createSubmission(input:
            {
              attachmentUrl: "https://example.com/doc.pdf",
              deliverableId: "#{deliverable.id}",
            }) {
            submission {
              id
              attachmentUrl
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      id = result.dig('data', 'createSubmission', 'submission', 'id')
      submission = Submission.find(id)

      assert_equal 'https://example.com/doc.pdf', submission.attachment_url
    end

    test '#resolve does not create a submission if the user is not enrolled in the course' do
      deliverable = deliverables(:first_deliverable)

      query = <<~EOF
        mutation CreateSubmission {
          createSubmission(input:
            {
              attachmentUrl: "https://example.com/doc.pdf",
              deliverableId: "#{deliverable.id}",
            }) {
            submission {
              id
              attachmentUrl
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin2) }, variables: {}).to_h
      submission = result.dig('data', 'createSubmission', 'submission')
      error_message = result.dig('data', 'createSubmission', 'errors', 0, 'message')

      assert_nil submission
      assert_equal 'You do not have permission to perform this action.', error_message
    end

    test '#resolve does not create a submission if the deliverable does not exist' do
      query = <<~EOF
        mutation CreateSubmission {
          createSubmission(input:
            {
              attachmentUrl: "https://example.com/doc.pdf",
              deliverableId: 0,
            }) {
            submission {
              id
              attachmentUrl
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      submission = result.dig('data', 'createSubmission', 'submission')
      error_message = result.dig('data', 'createSubmission', 'errors', 0, 'message')

      assert_nil submission
      assert_equal 'Could not find deliverable with id 0.', error_message
    end

    test '#resolve does not create a submission if the user is not authenticated' do
      deliverable = deliverables(:first_deliverable)

      query = <<~EOF
        mutation CreateSubmission {
          createSubmission(input:
            {
              attachmentUrl: "https://example.com/doc.pdf",
              deliverableId: "#{deliverable.id}",
            }) {
            submission {
              id
              attachmentUrl
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: {}, variables: {}).to_h
      submission = result.dig('data', 'createSubmission', 'submission')

      assert_nil submission
    end
  end
end
