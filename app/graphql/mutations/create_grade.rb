# frozen_string_literal: true
module Mutations
  class CreateGrade < BaseMutation
    include Authenticatable

    field :grade, Types::GradeType, null: true
    field :errors, [Types::UserError], null: false

    argument :submission_id, ID, required: true
    argument :value, Float, required: true
    argument :comment, String, required: true

    def resolve(submission_id:, value:, comment:)
      assert_authenticated!

      submission = Submission.find_by(id: submission_id)

      unless submission
        return {
          grade: nil,
          errors: Types::UserError.from("Could not find submission with id #{submission_id}."),
        }
      end

      grade = Grade.new(
        submission: submission,
        value: value,
        comment: comment,
      )

      unless user_is_offering_instructor(submission.deliverable.offering.id)
        return {
          grade: nil,
          errors: Types::UserError.from('You do not have permission to perform this action.'),
        }
      end

      if grade.save
        {
          grade: grade,
          errors: [],
        }
      else
        {
          grade: nil,
          errors: Types::UserError.from(grade.errors_hash),
        }
      end
    end

    private

    def user_is_offering_instructor(offering_id)
      context[:current_user].enrollments.find_by(offering_id: offering_id)&.role == 'professor'
    end
  end
end
