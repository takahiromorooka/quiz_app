module Api
  module V1
    class QuestionsController < Api::V1::ApplicationController

      def show
        @question = Question.find_by(id: params[:id])
        render json: @question
      end

      def answer
        answer = UserQuestion.new(answer_params)
        if answer.save!
          render json: answer_params
        else
          json_response(400, '保存に失敗しました。')
        end
      end

      def entry_user
        @users = User.all
        render json: @users
      end

      private
      def answer_params
        params.require(:question).permit(
          :user_id,
          :question_id,
          :answer
        )
      end

    end
  end
end
