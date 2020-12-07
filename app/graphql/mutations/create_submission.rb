# frozen_string_literal: true
module Mutations
  class CreateSubmission < BaseMutation
    include Authenticatable

    field :submission, Types::SubmissionType, null: true
    field :errors, [Types::UserError], null: false

    argument :deliverable_id, ID, required: true
    argument :attachment_url, String, required: true

    def resolve(deliverable_id:, attachment_url:)
      assert_authenticated!

      deliverable = Deliverable.find_by(id: deliverable_id)

      unless deliverable
        return {
          submission: nil,
          errors: Types::UserError.from("Could not find deliverable with id #{deliverable_id}."),
        }
      end

      submission = Submission.new(
        deliverable: deliverable,
        attachment_url: attachment_url,
        user: context[:current_user],
      )

      unless user_enrolled_as_student_in_offering(deliverable.offering.id)
        return {
          submission: nil,
          errors: Types::UserError.from('You do not have permission to perform this action.'),
        }
      end

      if submission.save
        {
          submission: submission,
          errors: [],
        }
      else
        {
          submission: nil,
          errors: Types::UserError.from(submission.errors_hash),
        }
      end
    end

    private

    def user_enrolled_as_student_in_offering(offering_id)
      context[:current_user].enrollments.find_by(offering_id: offering_id)&.role == 'student'
    end
  end
end
