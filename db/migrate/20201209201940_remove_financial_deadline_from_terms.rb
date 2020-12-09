# frozen_string_literal: true
class RemoveFinancialDeadlineFromTerms < ActiveRecord::Migration[6.0]
  def change
    remove_column(:terms, :financial_deadline, :datetime)
  end
end
