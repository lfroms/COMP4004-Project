# frozen_string_literal: true
module Resolvers
  class Courses < Resolvers::Base
    include Authenticatable

    type Types::CourseType.connection_type, null: false

    def resolve
      assert_authenticated!
      assert_admin_user!

      Course.all
    end
  end
end
