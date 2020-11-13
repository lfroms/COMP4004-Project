# frozen_string_literal: true
class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  validates :email, format: URI::MailTo::EMAIL_REGEXP, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }
end
