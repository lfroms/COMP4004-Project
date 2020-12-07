# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_12_07_025415) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "courses", force: :cascade do |t|
    t.string "name", null: false
    t.string "code", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["code"], name: "index_courses_on_code", unique: true
  end

  create_table "deliverables", force: :cascade do |t|
    t.string "title", null: false
    t.string "description", null: false
    t.float "weight", null: false
    t.datetime "due_date", null: false
    t.bigint "offering_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["offering_id"], name: "index_deliverables_on_offering_id"
  end

  create_table "enrollments", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "offering_id", null: false
    t.integer "role", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["offering_id"], name: "index_enrollments_on_offering_id"
    t.index ["user_id", "offering_id"], name: "index_enrollments_on_user_id_and_offering_id", unique: true
    t.index ["user_id"], name: "index_enrollments_on_user_id"
  end

  create_table "grades", force: :cascade do |t|
    t.float "value", null: false
    t.string "comment"
    t.bigint "submission_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["submission_id"], name: "index_grades_on_submission_id"
  end

  create_table "groups", force: :cascade do |t|
    t.string "name", null: false
    t.boolean "can_self_enroll", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "offerings", force: :cascade do |t|
    t.string "section", null: false
    t.bigint "course_id", null: false
    t.bigint "term_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "capacity", default: 100, null: false
    t.index ["course_id"], name: "index_offerings_on_course_id"
    t.index ["section", "term_id", "course_id"], name: "index_offerings_on_section_and_term_id_and_course_id", unique: true
    t.index ["term_id"], name: "index_offerings_on_term_id"
  end

  create_table "prerequisites", force: :cascade do |t|
    t.bigint "course_id", null: false
    t.bigint "prerequisite_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["course_id"], name: "index_prerequisites_on_course_id"
    t.index ["prerequisite_id"], name: "index_prerequisites_on_prerequisite_id"
  end

  create_table "submissions", force: :cascade do |t|
    t.string "attachment_url", null: false
    t.bigint "user_id", null: false
    t.bigint "deliverable_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["deliverable_id"], name: "index_submissions_on_deliverable_id"
    t.index ["user_id", "deliverable_id"], name: "index_submissions_on_user_id_and_deliverable_id", unique: true
    t.index ["user_id"], name: "index_submissions_on_user_id"
  end

  create_table "terms", force: :cascade do |t|
    t.datetime "start_date", null: false
    t.datetime "end_date", null: false
    t.datetime "registration_deadline", null: false
    t.datetime "withdrawal_deadline", null: false
    t.datetime "financial_deadline", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_groups", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "group_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["group_id"], name: "index_user_groups_on_group_id"
    t.index ["user_id"], name: "index_user_groups_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.boolean "admin", default: false, null: false
    t.boolean "approved", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "deliverables", "offerings"
  add_foreign_key "enrollments", "offerings"
  add_foreign_key "enrollments", "users"
  add_foreign_key "grades", "submissions"
  add_foreign_key "offerings", "courses"
  add_foreign_key "offerings", "terms"
  add_foreign_key "prerequisites", "courses"
  add_foreign_key "prerequisites", "courses", column: "prerequisite_id"
  add_foreign_key "submissions", "deliverables"
  add_foreign_key "submissions", "users"
  add_foreign_key "user_groups", "groups"
  add_foreign_key "user_groups", "users"
end
