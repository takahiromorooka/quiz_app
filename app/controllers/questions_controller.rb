class QuestionsController < ApplicationController

    def index
      @users = User.get_user_as_json

    end

end
