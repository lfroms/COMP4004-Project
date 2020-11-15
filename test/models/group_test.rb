# frozen_string_literal: true
require 'test_helper'

class GroupTest < ActiveSupport::TestCase
  test 'groups can be created with args' do
    group = Group.create(name: 'My Group', can_self_enroll: true)

    assert group.valid?
    assert_equal 'My Group', group.name
    assert group.can_self_enroll
  end

  test 'groups must have a name' do
    group = Group.create

    assert_not group.valid?
  end
end
