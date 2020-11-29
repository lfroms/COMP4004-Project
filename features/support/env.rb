# frozen_string_literal: true

require 'cucumber/rails'
require 'selenium-webdriver'
require 'rails/test_help'

ENV['RAILS_ENV'] ||= 'test'
require File.join(__dir__, '../../config/environment')

Capybara.register_driver(:selenium_chrome) do |app|
  Capybara::Selenium::Driver.new(
    app,
    browser: :remote,
    desired_capabilities: Selenium::WebDriver::Remote::Capabilities.chrome(
      'goog:chromeOptions' => {
        detach: true,
        args: [
          'window-size=1024,768',
        ],
      }
    ),
    url: ENV['HUB_URL']
  )
end

Capybara.run_server = true
Capybara.default_driver = :selenium_chrome

# Compile assets
Webpacker.compile

ip = %x(/sbin/ip route|awk '/scope/ { print $9 }')
ip = ip.gsub("\n", '')
Capybara.server_port = '3000'
Capybara.server_host = ip
Capybara.app_host = "http://#{Capybara.current_session.server.host}:#{Capybara.current_session.server.port}"

ActionController::Base.allow_rescue = true
