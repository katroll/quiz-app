Rails.application.routes.draw do
  resources :quizzes_classes, only: [:create]
  resources :users_classes, only: [:create]

  resources :spctc_classes, only: [:index, :create, :destroy]
  
  resources :grades, only: [:create, :index]
  resources :questions, only: [:create,]
  resources :quizzes, only: [:create, :index, :destroy]
  resources :users, only: [:index, :create, :destroy, :update]


  get "/me", to: "users#show"
  get "/exportusers", to: "users#export_user"

  get "/exportgrades", to: "grades#export_grades"

  post "/remove_student_from_class", to: "users_classes#remove_student_from_class"
  post "/remove_quiz_from_class", to: "quizzes_classes#remove_quiz_from_class"

  post "/signin", to: "sessions#create"
  delete "/signout", to: "sessions#destroy"

  




  
  
end
