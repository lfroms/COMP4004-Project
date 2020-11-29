# frozen_string_literal: true
# Need to precompile in advance so that tests don't time out.
puts '[WEBPACK] Compiling assets (this may take a while after code changes)...'
Webpacker.compile
puts '[WEBPACK] Done compiling assets.'
