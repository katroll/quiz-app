class SpctcClassSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :users
  has_many :quizzes
end
