# frozen_string_literal: true
module Types
  class UserError < Types::BaseObject
    description 'A user-readable error'

    field :message, String, null: false,
      description: 'A description of the error'
    field :path, [String], null: true,
      description: 'Which input value this error came from'

    class << self
      def from(obj)
        case obj
        when NilClass
          []
        when Array
          errors_from_messages(*obj)
        when String
          errors_from_messages(obj)
        when Hash
          errors_from_hash(obj)
        end
      end

      private

      def errors_from_messages(*messages)
        messages.map do |message|
          {
            message: message,
          }
        end
      end

      def errors_from_hash(errors)
        errors.map do |field, message|
          {
            message: message,
            path: field_name(field),
          }
        end
      end

      def field_name(field)
        field_name = [field]

        field_name.map! do |segment|
          segment.to_s.camelize(:lower)
        end
      end
    end
  end
end
