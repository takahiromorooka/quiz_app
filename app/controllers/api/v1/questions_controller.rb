module Api
  module V1
    class QuestionsController < Api::V1::ApplicationController


      def show
        @question = Question.find_by(id: params[:id])

        render json: @question
      end

    end
  end
end
