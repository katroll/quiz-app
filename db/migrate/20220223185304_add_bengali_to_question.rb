class AddBengaliToQuestion < ActiveRecord::Migration[7.0]
  def change
    add_column :questions, :bengali, :string
  end
end
