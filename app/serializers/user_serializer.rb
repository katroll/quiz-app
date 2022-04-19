class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :admin, :role, :created_at

  has_many :grades
  has_many :spctc_classes
end
