class AddStartTimeColumnToGrades < ActiveRecord::Migration[7.0]
  def change
    add_column :grades, :start_time, :string
  end
end
