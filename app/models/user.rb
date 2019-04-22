# == Schema Information
#
# Table name: users
#
#  id         :bigint(8)        not null, primary key
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ApplicationRecord
  has_many :user_questions
  has_many :questions, through: :user_questions

  validates :name, presence: true

  def self.get_user_as_json
    User.all.to_json(only: [:id, :name])
  end

end
