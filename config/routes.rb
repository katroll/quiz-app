Rails.application.routes.draw do

  # resources :questions, only: []
  resources :quizzes, only: [:create, :index]
  resources :users, only: [:create, :show]

  get "/me", to: "users#show"
  post "/signin", to: "sessions#create"
  delete "/signout", to: "sessions#destroy"

end
