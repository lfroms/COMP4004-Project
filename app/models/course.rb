# frozen_string_literal: true
class Course < ApplicationRecord
  validates :name, presence: true
  validates :code, presence: true, format: { with: /[A-Z]{4} [0-9]{4}/ }
end
