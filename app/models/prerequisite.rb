# frozen_string_literal: true
class Prerequisite < ApplicationRecord
  belongs_to :course
  belongs_to :prerequisite, class_name: 'Course'
end
