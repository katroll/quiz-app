class SpctcClass < ApplicationRecord
    has_many :users_classes, dependent: :destroy
    has_many :users, through: :users_classes

    has_many :quizzes_classes, dependent: :destroy
    has_many :quizzes, through: :quizzes_classes

    def enroll_new_student user
        initial_class = SpctcClasses.find_by(name: "New Students")
        user.spctc_classes << initial_class
    end
    
end
