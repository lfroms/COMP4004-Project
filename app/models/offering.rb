# frozen_string_literal: true
class Offering < ApplicationRecord
  validates :section, presence: true, format: { with: /\A[A-Z]{1}\z/ }
  validates :section, uniqueness: { scope: [:term_id, :course_id] }
  validates :capacity, presence: true, inclusion: 1..400
  validate :maximum_capacity

  belongs_to :course
  belongs_to :term

  has_many :enrollments, dependent: :destroy
  has_many :participants, through: :enrollments, source: :user, dependent: :destroy
  has_many :deliverables, dependent: :destroy

  def maximum_capacity
    if full?
      errors.add(:base, 'This course is at maximum capacity.')
    end
  end

  def full?
    student_count >= capacity
  end

  private

  def student_count
    enrollments.student.count
  end
end
