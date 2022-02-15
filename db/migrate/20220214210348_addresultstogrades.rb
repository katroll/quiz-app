class Addresultstogrades < ActiveRecord::Migration[7.0]
  def change
    add_column :grades, :results, :integer, array: true, default: []
  end
end
