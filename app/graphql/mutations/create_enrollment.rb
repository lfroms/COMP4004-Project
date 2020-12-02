# frozen_string_literal: true
module Mutations
  class CreateEnrollment < BaseMutation
    include Authenticatable

    field :enrollment, Types::EnrollmentType, null: false
    field :errors, [Types::UserError], null: false

    argument :role, String, required: true
    argument :user_id, ID, required: true
    argument :offering_id, ID, required: true

    def resolve(role:, user_id:, offering_id:)
      assert_authenticated!
      assert_admin_user! if role == 'professor'

      enrollment = Enrollment.new(role: role, user_id: user_id, offering_id: offering_id)

      if enrollment.save
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
  end
end
