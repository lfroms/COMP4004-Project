class AddCapacityToOfferings < ActiveRecord::Migration[6.0]
  def change
    add_column :offerings, :capacity, :integer, null: false
  end
end
