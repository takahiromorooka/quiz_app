class CreateUserQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :user_questions do |t|
      t.integer :user_id, null: false
      t.integer :question_id, null: false
      t.integer :answer

      t.timestamps null: false
    end
  end
end
