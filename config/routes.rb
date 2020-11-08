# frozen_string_literal: true
Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end

  post '/graphql', to: 'graphql#execute'
  root 'ui#index'

  # Send all unmatched routes to React router
  get '*a', to: 'ui#index'
end
