class UsersClassSerializer < ActiveModel::Serializer
  attributes :id

  has_one :user
  has_one :spctc_class
end
