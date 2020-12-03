# frozen_string_literal: true
class Enrollment < ApplicationRecord
  enum role: { student: 0, professor: 1 }
  validates :role, presence: true, inclusion: { in: roles.keys }
  validates :user_id, uniqueness: { scope: :offering_id }

  belongs_to :offering
  belongs_to :user
end
