class ExportGradeSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :quiz_id, :score, :results, :updated_at, :start_time
end