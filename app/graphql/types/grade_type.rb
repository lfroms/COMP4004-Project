# frozen_string_literal: true
module Types
  class GradeType < Types::BaseObject
    field :id, ID, null: false
    field :value, Float, null: false
    field :comment, String, null: false
    field :submission, Types::DeliverableType, null: false
  end
end
