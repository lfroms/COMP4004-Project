# frozen_string_literal: true
module Mutations
  class DeleteEnrollment < BaseMutation
    include Authenticatable

    field :enrollment, Types::EnrollmentType, null: true
    field :errors, [Types::UserError], null: false

    argument :id, ID, required: true

    def resolve(id:)
      assert_authenticated!

      enrollment = Enrollment.find_by(id: id)

      unless enrollment
        return {
          enrollment: nil,
          errors: Types::UserError.from("Could not find enrollment with id #{id}."),
        }
      end

      unless enrollment.deleted_at.nil?
        return {
          enrollment: nil,
          errors: Types::UserError.from("Enrollment with id #{id} has already been deleted."),
        }
      end

      unless (context[:current_user].can_self_enroll? && enrollment.role == 'student') || context[:current_user].admin
        return {
          enrollment: nil,
          errors: Types::UserError.from('You do not have permission to perform this action.'),
        }
      end

      if delete_or_drop(enrollment)
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

    def delete_or_drop(enrollment)
      if Time.zone.now < enrollment.offering.term.withdrawal_deadline
        enrollment.destroy
      else
        enrollment.update(deleted_at: Time.zone.now, final_grade: 'WDN')
      end
    end
  end
end
