# frozen_string_literal: true
class AddUniqueIndexToSubmissions < ActiveRecord::Migration[6.0]
  def change
    add_index(:submissions, [:user_id, :deliverable_id], unique: true)
  end
end
