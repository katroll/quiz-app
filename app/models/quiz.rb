class Quiz < ApplicationRecord
    has_many :questions, dependent: :destroy
    has_many :grades, dependent: :destroy
end
