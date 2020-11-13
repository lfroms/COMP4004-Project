# frozen_string_literal: true
module JsonWebToken
  class UserAuthenticator
    class << self
      def validate(request_headers)
        @request_headers = request_headers

        begin
          payload = JsonWebToken::Coder.decode(token)

          User.find_by(id: payload['user_id'])

        rescue => _
          nil
        end
      end

      private

      def token
        @request_headers['Authorization'].split(' ').last
      end
    end
  end
end
