# frozen_string_literal: true
class Term < ApplicationRecord
  validates :start_date, :end_date, :registration_deadline, :withdrawal_deadline, :per_credit_fee, presence: true
  validate :validate_positive_credit_fee, if: :per_credit_fee_present?
  validate :validate_start_end, if: :start_end_present?
  validate :validate_deadlines, if: :deadlines_present?
  has_many :offerings, dependent: :destroy

  def validate_start_end
    if start_date > end_date
      errors.add(:start_date, 'start_date must be before end_date')
    end
  end

  def validate_deadlines
    if start_end_present?
      if withdrawal_deadline > end_date || withdrawal_deadline < start_date
        errors.add(:withdrawal_deadline,
          'withdrawal_deadline must be within the bounds of start_date to end_date of the term')
      end

      if registration_deadline > end_date
        errors.add(:registration_deadline,
          'registration_deadlne must be before the end_date of the term')
      end
    end
  end

  def validate_positive_credit_fee
    if per_credit_fee < 0
      errors.add(:per_credit_fee, 'per_credit_fee must be greater than 0')
    end
  end

  def start_end_present?
    start_date.presence && end_date.presence
  end

  def deadlines_present?
    withdrawal_deadline.presence && registration_deadline.presence
  end

  def per_credit_fee_present?
    per_credit_fee.presence
  end
end
