# frozen_string_literal: true
module Mutations
  class UpdateCourse < BaseMutation
    include Authenticatable

    field :course, Types::CourseType, null: true
    field :errors, [Types::UserError], null: false

    argument :id, ID, required: true
    argument :name, String, required: true
    argument :code, String, required: true
    argument :prerequisite_ids, [ID], required: true

    def resolve(id:, name:, code:, prerequisite_ids: [])
      assert_authenticated!
      assert_admin_user!

      prerequisites = Course.where(id: prerequisite_ids)
      course = Course.find_by(id: id)

      unless course
        return {
          course: nil,
          errors: Types::UserError.from("Could not find course with id #{id}."),
        }
      end

      if course.update(name: name, code: code, prerequisites: prerequisites)
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
