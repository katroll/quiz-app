class Quiz < ApplicationRecord
    has_many :questions, dependent: :destroy
    has_many :grades, dependent: :destroy

    has_many :quizzes_classes, dependent: :destroy
    has_many :spctc_classes, through: :quizzes_classes
end
