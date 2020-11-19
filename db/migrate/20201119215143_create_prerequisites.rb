# frozen_string_literal: true
class CreatePrerequisites < ActiveRecord::Migration[6.0]
  def change
    create_table(:prerequisites) do |t|
      t.references(:course, null: false, foreign_key: true)
      t.references(:prerequisite, null: false, foreign_key: { to_table: :courses })

      t.timestamps
    end
  end
end
