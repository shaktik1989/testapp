app_services.factory('posts', ['$http', function ($http) {

  var get_posts = function (object) {
    var result = [];
    return $http.get('/posts.json').then(
      function (response) {
        object.list = response.data;
      }
    );
  };

  var get_single_post = function (object, poost_id) {
    var result = [];
    return $http.get('/posts'+poost_id+'.json').then(
      function (response) {
        object.list = response.data;
      }
    )
  };

  var create_post = function (scopeposts, newpost, poost_id) {
    var result = [];
    return $http.post('/posts.json', {post: newpost}).then(
      function (response) {
        if(response.status==201){
          scopeposts.list.push(response.data);
        }
      }
    );
  };

  var update_post = function (scopeposts, post_data, current_post_editing) {
    return $http.put('/posts/'+post_data.id+'.json', post_data).then(
      function (response) {
        if(response.status==200) {
          scopeposts;
          scopeposts.list[current_post_editing].title = post_data.title;
          scopeposts.list[current_post_editing].description = post_data.description;
        }
      }
    );
  };

  var delete_post = function (object, post, index) {
    var result = [];
    return $http.delete('/posts/'+post.id+'.json').then(
      function (response) {
        if(response.status==200) {
          get_posts(object);
        }
      }
    );
  };

  //Public facing API
  return {
    list: {
      get: get_posts
    },
    single: {
      get: get_single_post,
      create: create_post,
      delete_post: delete_post,
      update: update_post
    }
  };
}]);
