# Load the Rails application.
require_relative "application"

ActionController::CgiRequest::DEFAULT_SESSION_OPTIONS[:session_domain => 'https://morning-scrubland-82075.herokuapp.com']


# Initialize the Rails application.
Rails.application.initialize!

