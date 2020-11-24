# frozen_string_literal: true
require 'test_helper'

module Mutations
  class DeleteCourseTest < ActiveSupport::TestCase
    test '#resolve deletes and returns specified course' do
      course_to_delete = courses(:quality_assurance)

      query = <<~EOF
        mutation TestMutation {
          deleteCourse(input: {id: #{course_to_delete.id}}) {
            course {
              name
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      course = result.dig('data', 'deleteCourse', 'course')

      assert_not_nil course
      assert_equal course_to_delete.name, course['name']
    end

    test '#resolve returns nil if specified course does not exist' do
      query = <<~EOF
        mutation TestMutation {
          deleteCourse(input: {id: 0}) {
            course {
              id
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      value = result.dig('data', 'deleteCourse', 'course')

      assert_nil value
    end

    test '#resolve does not delete a course if the user is not authenticated' do
      course_to_delete = courses(:quality_assurance)

      query = <<~EOF
        mutation Deletecourse {
          deleteCourse(input: {id: #{course_to_delete.id}}) {
            course {
              id
            }
          }
        }
      EOF

      CmsSchema.execute(query, context: {}, variables: {}).to_h
      course = Course.find_by(id: course_to_delete.id)

      assert course.present?
    end

    test '#resolve does not delete a course if the current user is not an admin' do
      course_to_delete = courses(:quality_assurance)

      query = <<~EOF
        mutation Deletecourse {
          deleteCourse(input: {id: #{course_to_delete.id}}) {
            course {
              id
            }
          }
        }
      EOF

      CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      course = Course.find_by(id: course_to_delete.id)

      assert course.present?
    end
  end
end
