# frozen_string_literal: true
class RemoveBalanceFromUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column(:users, :balance, :float)
  end
end
