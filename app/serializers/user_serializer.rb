class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :admin, :role, :created_at

  has_many :grades
  has_many :users_classes
  has_many :spctc_classes, through: :users_classes
end
