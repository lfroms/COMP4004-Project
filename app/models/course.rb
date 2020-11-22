# frozen_string_literal: true
class Course < ApplicationRecord
  validates :name, presence: true
  validates :code, presence: true, format: { with: /[A-Z]{4} [0-9]{4}/ }

  has_many :course_prerequisites,
    class_name: 'Prerequisite',
    foreign_key: :prerequisite_id,
    dependent: :destroy,
    inverse_of: :course

  has_many :prerequisites, through: :course_prerequisites, source: :prerequisite
  has_many :offerings, dependent: :destroy
end
