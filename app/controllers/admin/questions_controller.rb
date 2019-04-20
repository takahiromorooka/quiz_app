module Admin
  class QuestionsController < ApplicationController
    def index

    end

    def aggregate
      users = User.all
      current_answers = Question.all.pluck(:answer_number)
      users.each do |user|
        score = 0
        answers = UserQuestion.where(user_id: user.id).pluck(:answer)
        answers.each_with_index do |answer, i|
          score += 2 if answer == current_answers[i]
        end
        user.update(score: score)
      end
      @result = users.order("score DESC")
    end
  end
end
