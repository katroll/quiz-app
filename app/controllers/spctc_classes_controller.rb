class SpctcClassesController < ApplicationController
  before_action :set_spctc_class, only: %i[ show update destroy ]

  # GET /spctc_classes
  # def index
  #   @spctc_classes = SpctcClass.all

  #   render json: @spctc_classes
  # end

  # GET /spctc_classes/1
  # def show
  #   render json: @spctc_class
  # end

  # POST /spctc_classes
  # def create
  #   @spctc_class = SpctcClass.new(spctc_class_params)

  #   if @spctc_class.save
  #     render json: @spctc_class, status: :created, location: @spctc_class
  #   else
  #     render json: @spctc_class.errors, status: :unprocessable_entity
  #   end
  # end

  # PATCH/PUT /spctc_classes/1
  # def update
  #   if @spctc_class.update(spctc_class_params)
  #     render json: @spctc_class
  #   else
  #     render json: @spctc_class.errors, status: :unprocessable_entity
  #   end
  # end

  # DELETE /spctc_classes/1
  # def destroy
  #   @spctc_class.destroy
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_spctc_class
    #   @spctc_class = SpctcClass.find(params[:id])
    # end

    # Only allow a list of trusted parameters through.
    # def spctc_class_params
    #   params.require(:spctc_class).permit(:name)
    # end
end
