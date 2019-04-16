# == Schema Information
#
# Table name: user_questions
#
#  id          :bigint(8)        not null, primary key
#  user_id     :integer          not null
#  question_id :integer          not null
#  answer      :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class UserQuestion < ApplicationRecord
  belongs_to :user
  belongs_to :question

  validates :user_id, presence: true
  validates :question_id, presence: true
end
