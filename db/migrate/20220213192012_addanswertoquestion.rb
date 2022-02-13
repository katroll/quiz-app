class Addanswertoquestion < ActiveRecord::Migration[7.0]
  def change
    add_column :questions, :answer, :integer
  end
end
