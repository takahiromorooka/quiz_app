class CreateUserImages < ActiveRecord::Migration[5.2]
  def change
    create_table :user_images do |t|
      t.integer :user_id, null: false
      t.string :content,  null: false

      t.timestamps null: false
    end
  end
end
