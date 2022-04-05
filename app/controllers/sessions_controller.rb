class SessionsController < ApplicationController

    def create

        user = User.find_by(username: params[:username])
        
        if user&.authenticate(params[:password])
            session[:user_id] = {value: user.id, domain: "https://morning-scrubland-82075.herokuapp.com"}
            render json: user, status: :created
        else
            render json: { error: "Invalid username or password" }, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end

end
