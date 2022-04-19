class CreateQuizzesClasses < ActiveRecord::Migration[7.0]
  def change
    create_table :quizzes_classes do |t|
      t.belongs_to :quiz, null: false, foreign_key: true
      t.belongs_to :spctc_class, null: false, foreign_key: true

      t.timestamps
    end
  end
end
