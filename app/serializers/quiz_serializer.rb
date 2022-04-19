class QuizSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :created_at, :kind

  has_many :questions
  has_many :grades
  has_many :quizzes_classes
  has_many :spctc_classes, through: :quizzes_classes
end
