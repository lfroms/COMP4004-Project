# frozen_string_literal: true
class Enrollment < ApplicationRecord
  enum role: { student: 0, professor: 1 }
  validates :role, presence: true, inclusion: { in: roles.keys }
  validates :user_id, uniqueness: { scope: :offering_id }
  validates :final_grade, allow_nil: true, inclusion: { in: %w(A+ A A- B+ B B- C+ C C- D+ D D- F WDN) }
  validates_associated :offering
  validate :has_prerequisites

  belongs_to :offering
  belongs_to :user

  def passed?
    final_grade && final_grade != 'F' && final_grade != 'WDN'
  end

  def has_prerequisites
    return if role == 'professor'
    offering.course.prerequisites.each do |prerequisite|
      earned_prereq = user.enrollments.any? do |enrollment|
        enrollment.offering.course.code == prerequisite.code &&
        enrollment.passed?
      end
      unless earned_prereq
        errors.add(:base, 'You do not have the required prerequisites.')
        break
      end
    end
  end
end
