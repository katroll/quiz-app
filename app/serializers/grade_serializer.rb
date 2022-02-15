class GradeSerializer < ActiveModel::Serializer
  attributes :id, :user, :quiz, :score

  def user
    User.find_by(id: self.object.user_id)
  end

  def quiz
    Quiz.find_by(id: self.object.quiz_id)
  end

  has_one :user
  has_one :quiz
end
