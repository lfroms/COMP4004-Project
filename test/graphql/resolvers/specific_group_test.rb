# frozen_string_literal: true
require 'test_helper'

module Resolvers
  class SpecificGroupTest < ActiveSupport::TestCase
    test '#resolve returns specified group' do
      group_id = groups(:self_enrolling).id
      query = <<~EOF
        query Group {
          group(id: #{group_id}) {
            name
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      group = results.dig('data', 'group')
      assert_equal groups(:self_enrolling).name, group['name']
    end

    test '#resolve returns nil when specified group does not exist' do
      query = <<~EOF
        query Group {
          group(id: 0) {
            name
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:admin) }, variables: {}).to_h
      value = results.dig('data', 'group')

      assert_nil value
    end

    test '#resolve returns nil if the current user is not authenticated' do
      group_id = groups(:self_enrolling).id
      query = <<~EOF
        query Group {
          group(id: #{group_id}) {
            name
          }
        }
      EOF

      results = CmsSchema.execute(query, context: {}, variables: {}).to_h

      assert_nil results.dig('data', 'group')
    end

    test '#resolve returns nil if the current user is not an admin' do
      group_id = groups(:self_enrolling).id
      query = <<~EOF
        query Group {
          group(id: #{group_id}) {
            name
          }
        }
      EOF

      results = CmsSchema.execute(query, context: { current_user: users(:not_admin) }, variables: {}).to_h

      assert_nil results.dig('data', 'group')
    end
  end
end
