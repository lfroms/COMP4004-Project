# frozen_string_literal: true
class Enrollment < ApplicationRecord
  enum role: { student: 0, professor: 1 }
  validates :role, presence: true, inclusion: { in: roles.keys }
  validates :user_id, uniqueness: { scope: :offering_id }
  validates_associated :offering
  validate :has_prerequisites

  belongs_to :offering
  belongs_to :user

  def has_prerequisites
    return if role == 'professor'
    courses_taken = user.enrollments.map { |enrollment| enrollment.offering.course.code}
    offering.course.prerequisites.each do |prerequisite|
      unless courses_taken.include? prerequisite.code
        errors.add(:base, 'You do not have the required prerequisites.')
        break
      end
    end
  end
end
