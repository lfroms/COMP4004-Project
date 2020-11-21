# frozen_string_literal: true
class CreateOfferings < ActiveRecord::Migration[6.0]
  def change
    create_table(:offerings) do |t|
      t.string(:section, null: false)
      t.references(:course, null: false, foreign_key: true)
      t.references(:term, null: false, foreign_key: true)
      t.index([:section, :term_id, :course_id], unique: true)

      t.timestamps
    end
  end
end
