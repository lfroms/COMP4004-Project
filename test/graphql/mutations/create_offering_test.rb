# frozen_string_literal: true
require 'test_helper'
module Mutations
  class CreateOfferingTest < ActiveSupport::TestCase
    test '#resolve creates a new offering and saves it to the database' do
      course_id = courses(:quality_assurance).id
      term_id = terms(:one).id
      query = <<~EOF
        mutation CreateOffering {
          createOffering(input: {section: "C", courseId: #{course_id}, termId: #{term_id}}) {
            offering {
              id
              section
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      id = result.dig('data', 'createOffering', 'offering', 'id')

      offering = Offering.find_by(id: id)

      assert_equal offering.section, 'C'
      assert_equal offering.course.code, courses(:quality_assurance).code
      assert_equal offering.term.start_date, terms(:one).start_date
    end

    test '#resolve does not create a new offering if the user is not authenticated' do
      course_id = courses(:quality_assurance).id
      term_id = terms(:one).id
      query = <<~EOF
        mutation CreateOffering {
          createOffering(input: {section: "C", courseId: #{course_id}, termId: #{term_id}}) {
            offering {
              id
              section
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: {}, variables: {}).to_h
      id = result.dig('data', 'createOffering', 'offering', 'id')
      offering = Offering.find_by(id: id)

      assert_nil offering
    end

    test '#resolve does not create a new course if the user is not an admin' do
      course_id = courses(:quality_assurance).id
      term_id = terms(:one).id
      query = <<~EOF
        mutation CreateOffering {
          createOffering(input: {section: "C", courseId: #{course_id}, termId: #{term_id}}) {
            offering {
              id
              section
            }
          }
        }
      EOF

      result = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h
      id = result.dig('data', 'createOffering', 'offering', 'id')
      offering = Offering.find_by(id: id)

      assert_nil offering
    end
  end
end
