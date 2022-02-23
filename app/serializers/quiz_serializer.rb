class QuizSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :created_at
  has_many :questions
  has_many :grades
end
