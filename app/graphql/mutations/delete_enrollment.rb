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
      assert_admin_user! if enrollment.role == 'professor'

      unless enrollment
        return {
          enrollment: nil,
          errors: Types::UserError.from("Could not find enrollment with id #{id}."),
        }
      end

      if enrollment.update(deleted_at: Time.zone.now)
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
