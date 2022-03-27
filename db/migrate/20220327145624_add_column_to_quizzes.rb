class AddColumnToQuizzes < ActiveRecord::Migration[7.0]
  def change
    add_column :quizzes, :type, :string
  end
end
