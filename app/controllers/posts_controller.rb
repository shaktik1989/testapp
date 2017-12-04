class PostsController < ApplicationController

  before_action :find_post, except: [:index, :create]

  def index
    posts = Post.all
    render_success(200, posts)
  end

  def create
    post = Post.create(post_params)
    if post.persisted?
      render_success(201, post)
    else
      render_error(202, post.errors.full_messages)
    end
  end

  def update
    if @post.update_attributes(post_params)
      render_success(200, {mssage: "Post updated successfully"})
    else
      render_error(202, @post.errors.full_messages)
    end
  end

  def show
    render_success(200, @post)
  end

  def destroy
    if @post.destroy
      render_success(200, {mssage: "Post deleted successfully"})
    else
      render_error(202, @post.errors.full_messages)
    end
  end

  private

    def find_post
      @post = Post.find_by_id(params[:id])
      if @post.blank?
        render_error(200, "Post not found") and return
      end
    end

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
