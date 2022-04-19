class SpctcClass < ApplicationRecord
    has_many :users_classes
    has_many :users, through: :users_classes

    has_many :quizzes_classes
    has_many :quizzes, through: :quizzes_classes
end
