class Addscoretogrades < ActiveRecord::Migration[7.0]
  def change
    add_column :grades, :score, :integer
  end
end
