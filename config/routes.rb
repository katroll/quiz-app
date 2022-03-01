Rails.application.routes.draw do
  
  resources :grades, only: [:create, :index]
  resources :questions, only: [:create,]
  resources :quizzes, only: [:create, :index]
  resources :users, only: [:index, :create, :destroy, :update]


  get "/me", to: "users#show"
  post "/signin", to: "sessions#create"
  delete "/signout", to: "sessions#destroy"
  
end
