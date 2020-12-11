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

      begin
        enrollment.transaction do
          term = enrollment.offering.term
          if Time.zone.now < term.withdrawal_deadline
            enrollment.destroy!
          else
            enrollment.update!(deleted_at: Time.zone.now, final_grade: 'WDN')
          end

          return {
            enrollment: enrollment,
            errors: [],
          }
        end
      rescue ActiveRecord::RecordInvalid => error
        {
          enrollment: nil,
          errors: Types::UserError.from(error.record.errors_hash),
        }
      end
    end
  end
end
