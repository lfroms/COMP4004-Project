# frozen_string_literal: true
module Mutations
  class DeleteCourse < BaseMutation
    include Authenticatable

    field :course, Types::CourseType, null: true
    field :errors, [Types::UserError], null: false

    argument :id, ID, required: true

    def resolve(id:)
      assert_authenticated!
      assert_admin_user!

      course = Course.find_by(id: id)

      unless course
        return {
          course: nil,
          errors: Types::UserError.from("Could not find course with id #{id}."),
        }
      end

      if course.destroy
        {
          course: course,
          errors: [],
        }
      else
        {
          course: nil,
          errors: Types::UserError.from(course.errors_hash),
        }
      end
    end
  end
end
