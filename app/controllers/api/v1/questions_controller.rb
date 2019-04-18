module Api
  module V1
    class QuestionsController < Api::V1::ApplicationController

      def show
        @question = Question.find_by(id: params[:id])

        render json: @question
      end

      def answer
        answer = UserQuestion.new(answer_params)
        answer.user_id = 1
        answer.save
      end

      private
      def answer_params
        params.permit(
          :question_id,
          :answer
        )
      end

    end
  end
end
