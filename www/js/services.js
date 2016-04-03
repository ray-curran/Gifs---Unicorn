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
    console.log(o.term);
    var url = "http://api.giphy.com/v1/gifs/search?q=" + o.term + "&limit=100&api_key=dc6zaTOxFJmzC";
    $http.get(url)
      .success(function(data){
      o.gifs = data;
      defer.resolve(true);
  })
      return defer.promise;
  };
  return o;
}])