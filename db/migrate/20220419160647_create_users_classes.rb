class CreateUsersClasses < ActiveRecord::Migration[7.0]
  def change
    create_table :users_classes do |t|
      t.belongs_to :users, null: false, foreign_key: true
      t.belongs_to :spctc_classes, null: false, foreign_key: true

      t.timestamps
    end
  end
end
