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

    field :courses,
      resolver: Resolvers::Courses,
      description: 'All courses in the system.'

    field :course,
      resolver: Resolvers::SpecificCourse,
      description: 'Specific details about a given course.' do
        argument :id, ID, required: true
      end

    field :terms,
      resolver: Resolvers::Terms,
      description: 'All terms in the system'

    field :term,
      resolver: Resolvers::SpecificTerm,
      description: 'Specific details about a given term.' do
        argument :id, ID, required: true
      end

    field :offerings,
      resolver: Resolvers::Offerings,
      description: 'All offerings in the system.'

    field :offering,
      resolver: Resolvers::SpecificOffering,
      description: 'Specific details about a given offering.' do
        argument :id, ID, required: true
      end

    field :enrollment,
      resolver: Resolvers::SpecificEnrollment,
      description: 'Specific details about a given enrollment.' do
        argument :id, ID, required: true
      end

    field :deliverable,
      resolver: Resolvers::SpecificDeliverable,
      description: 'Specific details about a given deliverable.' do
        argument :id, ID, required: true
      end
  end
end
