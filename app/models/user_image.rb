# == Schema Information
#
# Table name: user_images
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  content    :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UserImage < ApplicationRecord
  validates :user_id, presence: true
  validates :content, presence: true
end
