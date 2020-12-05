# frozen_string_literal: true
class Enrollment < ApplicationRecord
  enum role: { student: 0, professor: 1 }
  validates :role, presence: true, inclusion: { in: roles.keys }
  validates :user_id, uniqueness: { scope: :offering_id }
  validate :offering_capacity

  belongs_to :offering
  belongs_to :user

  def offering_capacity
    if offering && offering.full?
      errors.add(:offering, 'This offering is at maximum capacity')
    end
  end
end
