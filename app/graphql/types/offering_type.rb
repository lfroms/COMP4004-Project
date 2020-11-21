# frozen_string_literal: true
module Types
  class OfferingType < Types::BaseObject
    field :id, ID, null: false
    field :section, String, null: false
    field :course, Types::CourseType.connection_type, null: false
    field :term, Types::TermType.connection_type, null: false
  end
end
