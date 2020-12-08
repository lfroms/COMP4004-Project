class AddFinalGradeToEnrollments < ActiveRecord::Migration[6.0]
  def change
    add_column :enrollments, :final_grade, :string
  end
end
