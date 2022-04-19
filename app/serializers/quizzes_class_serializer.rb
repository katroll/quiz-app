class QuizzesClassSerializer < ActiveModel::Serializer
  attributes :id

  has_one :quiz
  has_one :spctc_class
end
