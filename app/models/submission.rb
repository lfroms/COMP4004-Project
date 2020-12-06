# frozen_string_literal: true
class Submission < ApplicationRecord
  URL_REGEXP = %r{\A(http|https)://[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,63}(:[0-9]{1,5})?(/.*)?\z}ix
  validates :attachment_url, presence: true, format: { with: URL_REGEXP }

  belongs_to :deliverable
  belongs_to :user
end
