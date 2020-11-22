# frozen_string_literal: true
module Types
  class CourseType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :code, String, null: false
    field :prerequisites, Types::CourseType.connection_type, null: false
  end
end
