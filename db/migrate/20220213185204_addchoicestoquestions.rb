class Addchoicestoquestions < ActiveRecord::Migration[7.0]
  def change
    add_column :questions, :choices, :text, array: true, default: []
  end
end
