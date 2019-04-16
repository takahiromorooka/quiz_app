class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :content, :answer_number

  has_many :answers
end
