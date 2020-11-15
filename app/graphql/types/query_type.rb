# frozen_string_literal: true
module Types
  class QueryType < Types::BaseObject
    description 'The queries that can be performed.'

    field :current_user,
      resolver: Resolvers::CurrentUser,
      description: 'Specific details about the current user.'

    field :users,
      resolver: Resolvers::Users,
      description: 'Specific details on all created users.'
  end
end
