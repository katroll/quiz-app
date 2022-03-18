class UsersController < ApplicationController
  before_action :set_user, only: %i[ destroy update ]

  before_action :check_admin, only: %i[ destroy update ]


  #GET /users
  def index
    @users = User.all
    render json: @users
  end

  def export_user
    @users = User.all
    render json: @users, each_serializer: ExportUserSerializer
  end

  # GET /users/1
  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end


  # DELETE /users/1
  def destroy
    @user.destroy
    render json: {}, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:first_name, :last_name, :username, :password, :admin, :role)
    end

    def check_admin
      curr_user = User.find_by(id: session[:user_id])
      
      if curr_user.role == "head-admin"
        return true 
      else 
        render json: {error: "This action is not permitted for this account"}, status: :unprocessable_entity
      end
    end
end
