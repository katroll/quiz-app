class ExportUserSerializer < ActiveModel::Serializer
    attributes :id, :first_name, :last_name, :username, :admin, :role, :created_at
end