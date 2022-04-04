# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

ActionController::CgiRequest::DEFAULT_SESSION_OPTIONS[:session_domain => '.herokuapp.com']
