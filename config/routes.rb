# frozen_string_literal: true
Rails.application.routes.draw do
  root 'ui#index'

  # Send all unmatched routes to React router
  get '*a', to: 'ui#index'
end
