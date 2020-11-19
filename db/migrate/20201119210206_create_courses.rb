# frozen_string_literal: true
class CreateCourses < ActiveRecord::Migration[6.0]
  def change
    create_table(:courses) do |t|
      t.string(:name, null: false)
      t.string(:code, null: false)

      t.timestamps
    end
  end
end
