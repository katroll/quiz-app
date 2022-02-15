class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :admin

  has_many :grades
end
