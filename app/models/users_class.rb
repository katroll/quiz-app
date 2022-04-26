class UsersClass < ApplicationRecord
  belongs_to :user
  belongs_to :spctc_class

  def self.find_users_class(spctc_class_id, user_id)
    UsersClass.where(user_id: user_id).where(spctc_class_id: spctc_class_id).id
  end

end
