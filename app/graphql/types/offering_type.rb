# frozen_string_literal: true
module Types
  class OfferingType < Types::BaseObject
    field :id, ID, null: false
    field :section, String, null: false
    field :course, Types::CourseType, null: false
    field :term, Types::TermType, null: false
  end
end
