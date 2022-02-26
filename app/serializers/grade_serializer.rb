class GradeSerializer < ActiveModel::Serializer
  attributes :id, :user, :quiz_data, :score, :results, :updated_at

  def user
    User.find_by(id: self.object.user_id)
  end

  def quiz_data
    quiz = Quiz.find_by(id: self.object.quiz_id)
    {quiz: quiz, questions: quiz.questions}
  end

  has_one :user
  # has_one :quiz, key: :quiz_data


end
