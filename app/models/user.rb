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
end
