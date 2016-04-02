angular.module('unikorn.controllers', [])

.controller('UnicornsCtrl', function($scope, unicorns, $ionicModal, $http) {
  $scope.unicorns = { data: []}

  $scope.search = function(query) {
    $scope.term = query;
    var url = "http://api.giphy.com/v1/gifs/search?q=" + query + "&limit=100&api_key=dc6zaTOxFJmzC"
    $http.get(url)
    .success(function(data){
    $scope.unicorns = data;
  })
  }

  $scope.term = 'unicorn';
  $scope.search($scope.term);

  $scope.showImages = function(index) {
    $scope.imageUrl = $scope.unicorns.data[index].images.original.url;
    $scope.showModal('templates/modal.html');
  }

  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };

  $scope.loadMoreData = function() {
    var url = "http://api.giphy.com/v1/gifs/search?q=" + $scope.term + "&limit=100&offset=" + $scope.unicorns.data.length + "&api_key=dc6zaTOxFJmzC";
    $http.get(url).success(function(data){
      $scope.unicorns.data = $scope.unicorns.data.concat(data.data)
    })
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };
})



.controller('TrendingCtrl', function($scope, trending, $ionicModal) {
  trending.success(function(data) {
    $scope.trending = data;
  })

  $scope.showImages = function(index) {
    $scope.imageUrl = $scope.trending.data[index].images.original.url;
    $scope.showModal('templates/modal.html');
  }

  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };
})

