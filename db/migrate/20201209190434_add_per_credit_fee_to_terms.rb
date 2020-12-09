# frozen_string_literal: true
class AddPerCreditFeeToTerms < ActiveRecord::Migration[6.0]
  def change
    add_column(:terms, :per_credit_fee, :float, default: 0.0)
  end
end
