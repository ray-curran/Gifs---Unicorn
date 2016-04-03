angular.module('unikorn.controllers', [])

.controller('UnicornsCtrl', function($scope, unicorns, $ionicModal, $http) {

  unicorns.search('unicorn')
  $scope.unicorns = unicorns.gifs

  $scope.search = function(query) {
    unicorns.search(query).then(function() {
      $scope.unicorns = unicorns.gifs
    }
    )}

  $scope.showImages = function(index) {
    $scope.imageUrl = unicorns.gifs.data[index].images.original.url;
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
    unicorns.loadMoreData().then(function() {
      $scope.unicorns = unicorns.gifs
      $scope.$broadcast('scroll.infiniteScrollComplete');
    })

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

