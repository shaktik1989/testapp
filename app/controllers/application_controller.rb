class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  def render_success(code, data)
    render json: data.as_json(except: [:updated_at]), status: code
  end

  def render_error(code, errors)
    render json: {errors: errors}, status: code
  end
end
