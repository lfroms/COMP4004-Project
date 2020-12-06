# frozen_string_literal: true
class AddCapacityToOfferings < ActiveRecord::Migration[6.0]
  def change
    add_column(:offerings, :capacity, :integer, null: false, default: 100)
  end
end
