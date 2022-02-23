class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :question, :choices, :answer, :bengali
  has_one :quiz
end
