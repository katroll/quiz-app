class UsersClassesController < ApplicationController

    def create
        puts "testing here"
        puts params
        @users_class = UsersClass.new(user_id: params[:user_id, spctc_class_id: params[:spctc_class_id]])

        puts @users_class
    
        if @users_class.save
          render json: @users_class, status: :created
        else
          render json: @users_class.errors, status: :unprocessable_entity
        end
    end

    private 

    def users_class_params
        params.require(:users_class).permit(:users_id, :spctc_class_id)
    end
    
  
end
