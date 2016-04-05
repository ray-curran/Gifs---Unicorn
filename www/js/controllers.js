angular.module('unikorn.controllers', [])

.controller('UnicornsCtrl', function($scope, modals, unicorns, $ionicModal, $http) {

  unicorns.search('unicorn')
  $scope.gifs = unicorns.gifs

  $scope.search = function(query) {
    unicorns.search(query).then(function() {
      $scope.gifs = unicorns.gifs
    }
    )}

  $scope.showImages = function(index) {
    $scope.imageUrl = modals.showImages(index, $scope);
    modals.showModal($scope);
  }


  $scope.closeModal = function() {
    modals.closeModal($scope);
  };

  $scope.loadMoreData = function() {
    unicorns.loadMoreData().then(function() {
      $scope.gifs = unicorns.gifs
      $scope.$broadcast('scroll.infiniteScrollComplete');
    })

  };
})



.controller('TrendingCtrl', function($scope, modals, trending, $ionicModal) {
  trending.success(function(data) {
    $scope.gifs = data;
  })

  $scope.showImages = function(index) {
    $scope.imageUrl = modals.showImages(index, $scope);
    modals.showModal($scope);
  }


  $scope.closeModal = function() {
    modals.closeModal($scope);
  };
})

