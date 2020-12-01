# frozen_string_literal: true
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def errors_hash
    errors.messages.each_with_object({}) do |(field, messages), result|
      result[field] = errors.full_message(field, messages.first)
    end
  end
end
