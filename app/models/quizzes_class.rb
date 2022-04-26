class QuizzesClass < ApplicationRecord
  belongs_to :quiz
  belongs_to :spctc_class

  def self.find_quizzes_class(spctc_class_id, quiz_id)
    QuizzesClass.where(quiz_id: quiz_id).where(spctc_class_id: spctc_class_id).id
  end
end
