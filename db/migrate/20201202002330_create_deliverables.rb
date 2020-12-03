# frozen_string_literal: true
class CreateDeliverables < ActiveRecord::Migration[6.0]
  def change
    create_table(:deliverables) do |t|
      t.string(:title, null: false)
      t.string(:description, null: false)
      t.float(:weight, null: false)
      t.datetime(:due_date, null: false)
      t.references(:offering, null: false, foreign_key: true)

      t.timestamps
    end
  end
end
