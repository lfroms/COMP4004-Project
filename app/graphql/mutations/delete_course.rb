# frozen_string_literal: true
module Mutations
  class DeleteCourse < BaseMutation
    include Authenticatable

    field :course, Types::CourseType, null: true

    argument :id, ID, required: true

    def resolve(id:)
      assert_authenticated!
      assert_admin_user!

      course = Course.find_by(id: id)

      {
        course: course&.destroy,
      }
    end
  end
end
