# frozen_string_literal: true
class Deliverable < ApplicationRecord
  validates :title, :description, :weight, :due_date, presence: true
  validates :weight, inclusion: 0..1

  belongs_to :offering
  has_many :submissions, dependent: :destroy
end
