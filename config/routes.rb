Rails.application.routes.draw do
  
  resources :grades, only: [:create, :index]
  resources :questions, only: [:create,]
  resources :quizzes, only: [:create, :index]
  resources :users, only: [:index, :create, :show, :destroy]


  get "/me", to: "users#show"
  post "/signin", to: "sessions#create"
  delete "/signout", to: "sessions#destroy"
  patch "/update_password/:id", to: "users#update_password"

end
