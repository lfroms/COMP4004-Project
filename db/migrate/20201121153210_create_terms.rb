class CreateTerms < ActiveRecord::Migration[6.0]
  def change
    create_table :terms do |t|
      t.datetime :start_date
      t.datetime :end_date
      t.datetime :registration_deadline
      t.datetime :withdrawal_deadline
      t.datetime :financial_deadline

      t.timestamps
    end
  end
end
