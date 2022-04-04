class ApplicationController < ActionController::API
    include ActionController::Cookies
    protect_from_forgery with: :exception
end
