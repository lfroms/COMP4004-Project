# frozen_string_literal: true
module Resolvers
  class SpecificCourse < Resolvers::Base
    include Authenticatable

    type Types::CourseType, null: true

    def resolve(id:)
      assert_authenticated!
      assert_admin_user!

      Course.find_by(id: id)
    end
  end
end
