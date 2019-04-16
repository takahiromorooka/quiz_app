# == Schema Information
#
# Table name: answers
#
#  id          :bigint(8)        not null, primary key
#  question_id :integer          not null
#  content     :string(255)      not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class AnswerSerializer < ActiveModel::Serializer
  attributes :id, :content
end
