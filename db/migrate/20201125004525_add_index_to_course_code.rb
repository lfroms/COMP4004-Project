# frozen_string_literal: true
class AddIndexToCourseCode < ActiveRecord::Migration[6.0]
  def change
    add_index(:courses, :code, unique: true)
  end
end
