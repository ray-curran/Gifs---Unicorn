angular.module('unikorn.services', [])

.factory('trending', ['$http', function($http) {
  return $http.get("http://api.giphy.com/v1/gifs/trending?limit=100&api_key=dc6zaTOxFJmzC")
  .success(function(data){
    return data;
  })
  .error(function(error){
    return error;
  })
}])


.factory('unicorns', ['$http', '$q', function($http, $q) {
  var o = {
    gifs: { data: []},
    term:'unicorn'
  }

  o.search = function(query) {
    var defer = $q.defer();

    o.term = query;
    var url = "http://api.giphy.com/v1/gifs/search?q=" + o.term + "&limit=100&api_key=dc6zaTOxFJmzC";
    $http.get(url)
      .success(function(data){
      o.gifs = data;
      defer.resolve(true);
  })
      return defer.promise;
  };

  o.loadMoreData = function() {
    var defer = $q.defer();
    var url = "http://api.giphy.com/v1/gifs/search?q=" + o.term + "&limit=100&offset=" + o.gifs.data.length + "&api_key=dc6zaTOxFJmzC";
     $http.get(url).success(function(data){
      o.gifs.data = o.gifs.data.concat(data.data)
      defer.resolve(true);
    })
     return defer.promise;
  }


  return o;
}])