# Use the Ruby 2.7.2 image from Docker Hub
# as the base image (https://hub.docker.com/_/ruby)
FROM ruby:2.7.2

# Install Yarn.
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn nodejs

WORKDIR /usr/src/app

COPY Gemfile* /usr/src/app/
RUN bundle install

COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install --check-files

COPY . /usr/src/app/

# Set "rails server -b 0.0.0.0" as the command to
# run when this container starts.
CMD ["rails", "server", "-b", "0.0.0.0"]
