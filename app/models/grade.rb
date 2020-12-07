# frozen_string_literal: true
class Grade < ApplicationRecord
  validates :value, presence: true, inclusion: 0..1
  belongs_to :submission
end
