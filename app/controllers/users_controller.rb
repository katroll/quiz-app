class UsersController < ApplicationController
  before_action :set_user, only: %i[ destroy update_password]

  before_action :check_admin, only: %i[ destroy update_password update_admin]


  #GET /users
  def index
    @users = User.all
    render json: @users
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
      puts "User: #{@user.errors.full_messages}"
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  
  def update_password
    if @user.update_attribute(:password_digest, BCrypt::Password.create(params[:password]))
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update_admin
    if @user.update(admin: params[:admin])
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:first_name, :last_name, :username, :password, :admin)
    end

    def check_admin
      user = User.find_by(id: session[:user_id])
      
      if user.admin 
        return true 
      else 
        render json: {error: "This action is not permitted for this account"}, status: :unprocessable_entity
      end
    end
end
