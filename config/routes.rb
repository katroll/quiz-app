Rails.application.routes.draw do
  
  resources :users, only: [:create, :show]

  get "/me", to: "admins#show"
  post "/signin", to: "sessions#create"
  delete "/signout", to: "sessions#destroy"

end
