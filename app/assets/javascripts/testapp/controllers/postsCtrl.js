app_controllers.
  controller('postsCtrl', ['$http', '$scope', 'posts',
    function ($http, $scope, posts) {
      
      var myscope = {};
      $scope.posts = {list: []};
      $scope.newpost = {id: "", title: "", description: ""};
      $scope.current_edit_index = null;
      $scope.cu_button_text = "Create Post";

      myscope.get_posts = function () {
        return posts.list.get($scope.posts).then(function () {
        });
      };

      $scope.delete_post = function(post, index) {
        return posts.single.delete_post($scope.posts, post, index).then(function () {
        });
      }

      $scope.edit_post = function(post, index) {
        $scope.current_edit_index = index;
        $scope.cu_button_text = "Update Post";
        $scope.newpost = {id: post.id, title: post.title, description: post.description};
      }

      $scope.clear_post_fields = function(post, index) {
        $scope.current_edit_index = null;
        $scope.cu_button_text = "Create Post";
        $scope.newpost = {id: "", title: "", description: ""};
      }

      $scope.create_update_post = function() {
        if($scope.newpost.id=="" || $scope.newpost.id==null || $scope.newpost.id==undefined) {
          return posts.single.create($scope.posts, $scope.newpost).then(function () {
            $scope.newpost = {id: "", title: "", description: ""};
          });
        } else {
          return posts.single.update($scope.posts, $scope.newpost, $scope.current_edit_index).then(function () {
            $scope.newpost = {title: "", description: ""};
            $scope.cu_button_text = "Create Post";
          });
        }
      }

      myscope.init = function () {
        myscope.get_posts();
      };

      myscope.init();

    }]);