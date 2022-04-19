# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_04_19_161043) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "grades", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "quiz_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "results", default: [], array: true
    t.integer "score"
    t.string "start_time"
    t.index ["quiz_id"], name: "index_grades_on_quiz_id"
    t.index ["user_id"], name: "index_grades_on_user_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "question"
    t.bigint "quiz_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "choices", default: [], array: true
    t.integer "answer"
    t.string "bengali"
    t.integer "number"
    t.string "imageBase64"
    t.index ["quiz_id"], name: "index_questions_on_quiz_id"
  end

  create_table "quizzes", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "category"
    t.string "kind"
  end

  create_table "quizzes_classes", force: :cascade do |t|
    t.bigint "quiz_id", null: false
    t.bigint "spctc_class_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["quiz_id"], name: "index_quizzes_classes_on_quiz_id"
    t.index ["spctc_class_id"], name: "index_quizzes_classes_on_spctc_class_id"
  end

  create_table "spctc_classes", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin"
    t.string "role"
  end

  create_table "users_classes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "spctc_class_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["spctc_class_id"], name: "index_users_classes_on_spctc_class_id"
    t.index ["user_id"], name: "index_users_classes_on_user_id"
  end

  add_foreign_key "grades", "quizzes"
  add_foreign_key "grades", "users"
  add_foreign_key "questions", "quizzes"
  add_foreign_key "quizzes_classes", "quizzes"
  add_foreign_key "quizzes_classes", "spctc_classes"
  add_foreign_key "users_classes", "spctc_classes"
  add_foreign_key "users_classes", "users"
end
