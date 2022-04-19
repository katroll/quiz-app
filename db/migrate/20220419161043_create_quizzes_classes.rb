class CreateQuizzesClasses < ActiveRecord::Migration[7.0]
  def change
    create_table :quizzes_classes do |t|
      t.belongs_to :quizzes, null: false, foreign_key: true
      t.belongs_to :spctc_classes, null: false, foreign_key: true

      t.timestamps
    end
  end
end
