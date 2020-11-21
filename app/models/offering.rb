class Offering < ApplicationRecord
  validates :section, presence: true, format: { with:  /\A[A-Z]{1}\z/ }
  validates_uniqueness_of :section, scope: [:term_id, :course_id]

  belongs_to :course
  belongs_to :term
end
