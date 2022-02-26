class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :question, :choices, :answer, :bengali, :number, :imageBase64
  has_one :quiz
end
