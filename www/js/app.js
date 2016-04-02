angular.module('unikorn', ['ionic', 'unikorn.controllers', 'unikorn.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.unicorns', {
    url: '/unicorns',
    views: {
      'tab-unicorns': {
        templateUrl: 'templates/tab-unicorns.html',
        controller: 'UnicornsCtrl'
      }
    }
  })

  .state('tab.trending', {
      url: '/trending',
      views: {
        'tab-trending': {
          templateUrl: 'templates/tab-trending.html',
          controller: 'TrendingCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/tab/unicorns');

});
