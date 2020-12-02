# frozen_string_literal: true
require 'test_helper'

module Mutations
  class UpdateCourseTest < ActiveSupport::TestCase
    test '#resolve updates a course with prerequisites and saves it to the database' do
      course_to_update = courses(:just_another_course)

      query = <<~EOF
        mutation UpdateCourse {
          updateCourse(input: {id: "#{course_to_update.id}", name: "Updated", code: "UPDT 9999", prerequisiteIds: [#{courses(:quality_assurance).id}]}) {
            course {
              id
              name
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      id = result.dig('data', 'updateCourse', 'course', 'id')

      course = Course.find(id)

      assert_equal 'Updated', course.name
      assert_equal 'UPDT 9999', course.code
      assert_equal 'Software Quality Assurance', course.prerequisites.first.name
    end

    test '#resolve returns nil and error message if specified course does not exist' do
      query = <<~EOF
        mutation UpdateCourse {
          updateCourse(input: {id: 0, name: "Updated", code: "UPDT 9999", prerequisiteIds: [#{courses(:quality_assurance).id}]}) {
            course {
              id
              name
            }
            errors {
              message
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      value = result.dig('data', 'updateCourse', 'course')
      error_message = result.dig('data', 'updateCourse', 'errors', 0, 'message')

      assert_equal 'Could not find course with id 0.', error_message
      assert_nil value
    end

    test '#resolve does not update a course if the user is not authenticated' do
      course_to_update = courses(:just_another_course)

      query = <<~EOF
        mutation UpdateCourse {
          updateCourse(input: {id: "#{course_to_update.id}", name: "Test Course", code: "COMP 9999"}) {
            course {
              id
              name
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: {}, variables: {}).to_h
      course = result.dig('data', 'updateCourse', 'course')

      assert_nil course
      assert_equal 'Just Another Course', course_to_update.name
      assert_equal 'JANC 1010', course_to_update.code
    end

    test '#resolve does not update a course if the user is not an admin' do
      course_to_update = courses(:just_another_course)

      query = <<~EOF
        mutation UpdateCourse {
          updateCourse(input: {id: "#{course_to_update.id}", name: "Test Course", code: "COMP 9999"}) {
            course {
              id
              name
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      course = result.dig('data', 'updateCourse', 'course')

      assert_nil course
      assert_equal 'Just Another Course', course_to_update.name
      assert_equal 'JANC 1010', course_to_update.code
    end
  end
end
