# == Schema Information
#
# Table name: questions
#
#  id            :bigint(8)        not null, primary key
#  content       :string(255)      not null
#  answer_number :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :content, :answer_number

  has_many :answers
end
