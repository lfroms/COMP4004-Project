# frozen_string_literal: true
class User < ApplicationRecord
  has_secure_password

  has_many :user_groups, dependent: :destroy
  has_many :groups, through: :user_groups
  has_many :enrollments, dependent: :destroy
  has_many :offerings_enrolled_in, through: :enrollments, source: :offering, dependent: :destroy

  validates :name, presence: true
  validates :email, format: URI::MailTo::EMAIL_REGEXP, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }, on: :create

  def can_self_enroll?
    groups.any?(&:can_self_enroll)
  end
end
