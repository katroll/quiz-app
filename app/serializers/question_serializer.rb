class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :question, :choices, :answer, :bengali, :number
  has_one :quiz
end
