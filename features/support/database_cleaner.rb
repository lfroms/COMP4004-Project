# frozen_string_literal: true

# DatabaseCleaner.clean_with(:deletion)

begin
  require 'database_cleaner'
  require 'database_cleaner/cucumber'

  DatabaseCleaner.strategy = :truncation
  DatabaseCleaner.allow_remote_database_url = true
  DatabaseCleaner.clean_with(:truncation)
rescue NameError
  raise 'You need to add database_cleaner to your Gemfile (in the :test group) if you wish to use it.'
end

Before do
  DatabaseCleaner.clean_with(:truncation)
  Rails.application.load_seed
end

Cucumber::Rails::Database.javascript_strategy = :deletion
