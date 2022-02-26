class AddImageColumnToQuestions < ActiveRecord::Migration[7.0]
  def change
    add_column :questions, :imageBase64, :string
  end
end
