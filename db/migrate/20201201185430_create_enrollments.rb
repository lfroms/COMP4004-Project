# frozen_string_literal: true
class CreateEnrollments < ActiveRecord::Migration[6.0]
  def change
    create_table(:enrollments) do |t|
      t.references(:user, null: false, foreign_key: true)
      t.references(:offering, null: false, foreign_key: true)
      t.integer(:role, null: false)
      t.index([:user_id, :offering_id], unique: true)
      t.timestamp(:deleted_at)

      t.timestamps
    end
  end
end
