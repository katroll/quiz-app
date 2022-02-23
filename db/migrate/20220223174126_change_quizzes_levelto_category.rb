class ChangeQuizzesLeveltoCategory < ActiveRecord::Migration[7.0]
  def change
    rename_column :quizzes, :level, :category
  end
end
