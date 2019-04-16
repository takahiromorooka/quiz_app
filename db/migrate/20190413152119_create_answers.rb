class CreateAnswers < ActiveRecord::Migration[5.2]
  def change
    create_table :answers do |t|
      t.integer :question_id, null: false
      t.string :content, null: false

      t.timestamps null: false
    end
  end
end
