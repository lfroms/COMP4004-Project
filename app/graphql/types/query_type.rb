# frozen_string_literal: true
module Types
  class QueryType < Types::BaseObject
    description 'The queries that can be performed.'

    field :current_user,
      resolver: Resolvers::CurrentUser,
      description: 'Specific details about the current user.'

    field :users,
      resolver: Resolvers::Users,
      description: 'All users in the system.'

    field :user,
      resolver: Resolvers::SpecificUser,
      description: 'Specific details about a given user.' do
        argument :id, ID, required: true
      end

    field :groups,
      resolver: Resolvers::Groups,
      description: 'All groups in the system.'

    field :group,
      resolver: Resolvers::SpecificGroup,
      description: 'Specific details about a given group.' do
        argument :id, ID, required: true
      end
  end
end
