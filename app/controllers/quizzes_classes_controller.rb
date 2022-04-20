class QuizzesClassesController < ApplicationController

    def create
        @quizzes_class = QuizzesClass.new(quizzes_class_params)
    
        if @quizzes_class.save
          render json: @quizzes_class, status: :created
        else
          render json: @quizzes_class.errors, status: :unprocessable_entity
        end
    end

    private 

    def quizzes_class_params
        params.require(:quizzes_class).permit(:quiz_id, :spctc_class_id)
    end
end
