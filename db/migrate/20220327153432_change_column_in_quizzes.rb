class ChangeColumnInQuizzes < ActiveRecord::Migration[7.0]
  def change
    rename_column :quizzes, :type, :kind
  end
end
