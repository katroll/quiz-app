class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :question, :choices, :answer
  has_one :quiz
end
