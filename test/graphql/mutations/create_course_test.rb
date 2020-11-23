# frozen_string_literal: true
module Mutations
  class CreateCourseTest < ActiveSupport::TestCase
    test '#resolve creates a new course and saves it to the database' do
      query = <<~EOF
        mutation CreateCourse {
          createCourse(input: {name: "Test Course", code: "COMP 9999"}) {
            course {
              id
              name
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      id = result.dig('data', 'createCourse', 'course', 'id')

      course = Course.find(id)

      assert_equal course.name, 'Test Course'
      assert_equal course.code, 'COMP 9999'
    end

    test '#resolve creates a new course with prerequisites and saves it to the database' do
      query = <<~EOF
        mutation CreateCourse {
          createCourse(input: {name: "Test Course", code: "COMP 9999", prerequisiteIds: [#{courses(:quality_assurance).id}]}) {
            course {
              id
              name
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      id = result.dig('data', 'createCourse', 'course', 'id')

      course = Course.find(id)

      assert_equal course.name, 'Test Course'
      assert_equal course.code, 'COMP 9999'
      assert_equal course.prerequisites.first.name, 'Software Quality Assurance'
    end

    test '#resolve does not create a new course if the user is not authenticated' do
      query = <<~EOF
        mutation CreateCourse {
          createCourse(input: {name: "Test Course", code: "COMP 9999"}) {
            course {
              id
              name
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: {}, variables: {}).to_h
      id = result.dig('data', 'createCourse', 'course', 'id')
      course = Course.find_by(id: id)

      assert_nil course
    end

    test '#resolve does not create a new course if the user is not an admin' do
      query = <<~EOF
        mutation CreateCourse {
          createCourse(input: {name: "Test Course", code: "COMP 9999"}) {
            course {
              id
              name
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      id = result.dig('data', 'createCourse', 'course', 'id')
      course = Course.find_by(id: id)

      assert_nil course
    end
  end
end
