# frozen_string_literal: true
module Mutations
  class CreateCourse < BaseMutation
    include Authenticatable

    field :course, Types::CourseType, null: true
    field :errors, [Types::UserError], null: false

    argument :name, String, required: true
    argument :code, String, required: true
    argument :prerequisite_ids, [ID], required: false

    def resolve(name:, code:, prerequisite_ids: [])
      assert_authenticated!
      assert_admin_user!

      prerequisites = Course.where(id: prerequisite_ids)
      course = Course.new(name: name, code: code, prerequisites: prerequisites)

      if course.save
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
