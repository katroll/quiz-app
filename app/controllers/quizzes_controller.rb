class QuizzesController < ApplicationController
  before_action :set_quiz, only: %i[ show update destroy ]

  # GET /quizzes
  def index
    @quizzes = Quiz.all
  
    render json: @quizzes
  end

  # GET /quizzes/1
  def show
    render json: @quiz
  end

  # POST /quizzes
  def create
    quiz = Quiz.create(quiz_params)
    if quiz
      render json: quiz, status: :created
    else
      render json: {errors: "unproccessable entity"}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /quizzes/1
  def update
    if @quiz.update(quiz_params)
      render json: @quiz
    else
      render json: @quiz.errors, status: :unprocessable_entity
    end
  end

  # DELETE /quizzes/1
  def destroy
    @quiz.destroy
    render json: {}, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_quiz
      @quiz = Quiz.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def quiz_params
      params.require(:quiz).permit(:name, :category, :kind)
    end
end
