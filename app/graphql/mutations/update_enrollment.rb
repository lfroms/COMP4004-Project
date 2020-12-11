# frozen_string_literal: true
module Mutations
  class UpdateEnrollment < BaseMutation
    include Authenticatable

    field :enrollment, Types::EnrollmentType, null: true
    field :errors, [Types::UserError], null: false

    argument :id, ID, required: true
    argument :final_grade, String, required: false

    def resolve(id:, final_grade:)
      assert_authenticated!

      enrollment = Enrollment.find_by(id: id)

      unless user_is_offering_instructor(enrollment)
        return {
          enrollment: nil,
          errors: Types::UserError.from('You do not have permission to perform this action.'),
        }
      end

      if enrollment.update(final_grade: final_grade)
        {
          enrollment: enrollment,
          errors: [],
        }
      else
        {
          enrollment: nil,
          errors: Types::UserError.from(enrollment.errors_hash),
        }
      end
    end

    private

    def user_is_offering_instructor(enrollment)
      if enrollment
        offering = enrollment&.offering
        context[:current_user].enrollments.professor.find_by(offering_id: offering.id)
      end
    end
  end
end
