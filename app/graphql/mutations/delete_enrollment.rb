# frozen_string_literal: true
module Mutations
  class DeleteEnrollment < BaseMutation
    include Authenticatable

    field :enrollment, Types::EnrollmentType, null: true

    argument :id, ID, required: true

    def resolve(id:)
      assert_authenticated!

      enrollment = Enrollment.find_by(id: id)
      assert_admin_user! if enrollment.role == 'professor'

      enrollment.update!(deleted_at: Time.zone.now)
      {
        enrollment: enrollment,
      }
    end
  end
end
