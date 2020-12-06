# frozen_string_literal: true
class CreateSubmissions < ActiveRecord::Migration[6.0]
  def change
    create_table(:submissions) do |t|
      t.string(:attachment_url, null: false)
      t.references(:user, null: false, foreign_key: true)
      t.references(:deliverable, null: false, foreign_key: true)

      t.timestamps
    end
  end
end
