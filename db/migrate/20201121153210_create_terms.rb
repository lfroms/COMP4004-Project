# frozen_string_literal: true
class CreateTerms < ActiveRecord::Migration[6.0]
  def change
    create_table(:terms) do |t|
      t.datetime(:start_date, null: false)
      t.datetime(:end_date, null: false)
      t.datetime(:registration_deadline, null: false)
      t.datetime(:withdrawal_deadline, null: false)
      t.datetime(:financial_deadline, null: false)

      t.timestamps
    end
  end
end
