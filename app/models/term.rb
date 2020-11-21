class Term < ApplicationRecord
  validates :start_date, :end_date, :registration_deadline, :withdrawal_deadline, :financial_deadline, presence: true
  validate :validate_start_end, if: :start_end_present?
  validate :validate_deadlines, if: :deadlines_present?

  def validate_start_end
    if start_date > end_date
      errors.add(:start_date, "start_date must be before end_date")
    end
  end

  def validate_deadlines
    if start_end_present?
      if withdrawal_deadline > end_date || withdrawal_deadline < start_date
        errors.add(:withdrawal_deadline, "withdrawal_deadline must be within the bounds of start_date to end_date of the term")
      end

      if financial_deadline > end_date || financial_deadline < start_date
        errors.add(:financial_deadline, "financial_deadline must be within the bounds of start_date to end_date of the term")
      end
    end
  end

  def start_end_present?
    start_date.presence && end_date.presence
  end

  def deadlines_present?
    withdrawal_deadline.presence && financial_deadline.presence
  end
end
