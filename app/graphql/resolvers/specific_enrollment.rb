# frozen_string_literal: true
module Resolvers
  class SpecificEnrollment < Resolvers::Base
    include Authenticatable

    type Types::EnrollmentType, null: true

    def resolve(id:)
      assert_authenticated!

      enrollment = Enrollment.find_by(id: id)
      return nil unless enrollment
      return nil unless enrollment.user == context[:current_user]

      enrollment
    end
  end
end
