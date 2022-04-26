class UsersClassesController < ApplicationController

    def create
        @users_class = UsersClass.new(users_class_params)
    
        if @users_class.save
          render json: @users_class, status: :created
        else
          render json: @users_class.errors, status: :unprocessable_entity
        end
    end

    def remove_student_from_class
      users_class = UsersClass.find_users_class(params[:spctc_class_id], params[:user_id])

      if users_class
        UsersClass.destroy(users_class)
        render json: {}, status: :ok
      else
        render json: {error: "cannot find users_class"}, status: :not_found
      end
    end

    private 

    def users_class_params
        params.require(:users_class).permit(:user_id, :spctc_class_id)
    end
    
  
end
