class QuizzesClassesController < ApplicationController

    def create
        @quizzes_class = QuizzesClass.new(quizzes_class_params)
    
        if @quizzes_class.save
          render json: @quizzes_class, status: :created
        else
          render json: @quizzes_class.errors, status: :unprocessable_entity
        end
    end

    def remove_quiz_from_class
      quizzes_class = QuizzesClass.find_quizzes_class(params[:spctc_class_id], params[:quiz_id])

      if quizzes_class
        QuizzesClass.destroy(quizzes_class)
        render json: {}, status: :ok
      else
        render json: {error: "cannot find quizzes_class"}, status: :not_found
      end
    end


    private 

    def quizzes_class_params
        params.require(:quizzes_class).permit(:quiz_id, :spctc_class_id)
    end
end
