module Api
  module V1
    class ApplicationController < ActionController::Base
      protect_from_forgery with: :null_session

      unless Rails.env.development?
        rescue_from Exception, with: :render_500
        rescue_from ActiveRecord::RecordNotFound, with: :render_404
        rescue_from ActionController::RoutingError, with: :render_404
      end

      def error_format(code, message, data=nil)
        { code: code, message: message, data: data }
      end

      def render_404(e = nil)
        render json: error_format(404, '該当のリソースは見つかりませんでした。'), status: 404
      end

      def render_500(e = nil)
        render json: error_format(500, 'サーバーエラーが発生しています。'), status: 500
      end

      def json_response(status, data)
        render json: { status: status, data: data }, status: status
      end

    end
  end
end
