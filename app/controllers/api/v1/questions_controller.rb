module Api
  module V1
    class QuestionsController < Api::V1::ApplicationController

      def show
        @question = Question.find_by(id: params[:id])

        render json: @question
      end

      def answer
        answer = UserQuestion.new(question_id: answer_params[:question_id], answer: answer_params[:answer])
        answer.user_id = User.find_by!(name: answer_params[:userName]).id
        if answer.save!
          render json: answer_params
        else
          json_response(400, '保存に失敗しました。')
        end
      end

      private
      def answer_params
        params.require(:question).permit(
          :userName,
          :question_id,
          :answer
        )
      end

    end
  end
end
