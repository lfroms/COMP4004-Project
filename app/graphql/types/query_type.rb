# frozen_string_literal: true
module Types
  class QueryType < Types::BaseObject
    description 'The queries that can be performed.'

    field :current_user,
      resolver: Resolvers::CurrentUser,
      description: 'Specific details about the current user.'
  end
end
