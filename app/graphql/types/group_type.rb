# frozen_string_literal: true
module Types
  class GroupType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :can_self_enroll, Boolean, null: false
    field :users, Types::UserType.connection_type, null: false
  end
end
