# frozen_string_literal: true
class CreateGrades < ActiveRecord::Migration[6.0]
  def change
    create_table(:grades) do |t|
      t.float(:value, null: false)
      t.string(:comment, null: true)
      t.references(:submission, null: false, foreign_key: true)

      t.timestamps
    end
  end
end
