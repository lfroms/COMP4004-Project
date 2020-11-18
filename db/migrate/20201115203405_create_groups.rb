# frozen_string_literal: true
class CreateGroups < ActiveRecord::Migration[6.0]
  def change
    create_table(:groups) do |t|
      t.string(:name, null: false)
      t.boolean(:can_self_enroll, null: false, default: false)

      t.timestamps
    end
  end
end
