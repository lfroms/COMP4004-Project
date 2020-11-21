# frozen_string_literal: true
require 'test_helper'

module Resolvers
  class SpecificGroupTtest < ActiveSupport::TestCase
    test '#resolve returns specified group' do
      group_id = groups(:self_enrolling).id
      query = <<~EOF
        query Group {
          group(id: #{group_id}) {
            name
          }
        }
      EOF

      results = CmsSchema.execute(query, context: {}, variables: {}).to_h
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

      results = CmsSchema.execute(query, context: {}, variables: {}).to_h
      value = results.dig('data', 'group')

      assert_nil value
    end
  end
end
