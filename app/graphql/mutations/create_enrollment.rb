# frozen_string_literal: true
module Mutations
  class CreateEnrollment < BaseMutation
    include Authenticatable

    field :enrollment, Types::EnrollmentType, null: true
    field :errors, [Types::UserError], null: false

    argument :role, String, required: true
    argument :user_id, ID, required: true
    argument :offering_id, ID, required: true

    def resolve(role:, user_id:, offering_id:)
      assert_authenticated!

      enrollment = Enrollment.new(role: role, user_id: user_id, offering_id: offering_id)

      unless (context[:current_user].can_self_enroll? && enrollment.role == 'student') || context[:current_user].admin
        return {
          enrollment: nil,
          errors: Types::UserError.from('You do not have permission to perform this action.'),
        }
      end

      begin
        enrollment.transaction do
          per_credit_fee = enrollment.offering.term.per_credit_fee
          new_balance = enrollment.user.balance + per_credit_fee
          enrollment.save!
          enrollment.user.update!(balance: new_balance)
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
