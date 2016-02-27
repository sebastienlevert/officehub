(function() {
  'use strict';

  angular
    .module('OfficeHub')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {   
    //$locationProvider.html5Mode(true);
     
    $stateProvider
      .state('root', {
        url: '',
        abstract: true,
        views: {
          'header': {
            templateUrl: 'app/components/header/header.html'
          },
          'footer': {
            templateUrl: 'app/components/footer/footer.html'
          },
          'navigation': {
            templateUrl: 'app/components/navigation/navigation.html'
          },          
          'suitebar': {
            templateUrl: 'app/components/suitebar/suitebar.html'
          }
        }
      })
      .state('root.home', {
        url: '/',
        views: {
           'container@': { 
            templateUrl: 'app/components/home/home.html'
          }
        }
      })
      .state('root.messages', {
        url: '/messages',
        views: {
          'container@': {
            templateUrl: 'app/components/messages/views/inbox.html',
            controller: "InboxController",
            controllerAs: "vm"
          }
        },
        requireADLogin: true
      })
      .state('root.messageNew', {
        url: '/messages/compose',
        views: {
          'container@': {
            templateUrl: 'app/components/messages/views/compose.html',
            controller: "NewMessageController",
            controllerAs: "vm"
          }
        },
        requireADLogin: true
      })
      .state('root.message', {
        url: '/messages/:id',
        views: {
          'container@': {
            templateUrl: 'app/components/messages/views/message.html',
            controller: "MessageController",
            controllerAs: "vm"
          }
        },
        requireADLogin: true
      })
      .state('root.messageReply', {
        url: '/messages/compose/:id',
        views: {
          'container@': {
            templateUrl: 'app/components/messages/views/compose.html',
            controller: "ReplyController",
            controllerAs: "vm"
          }
        },
        requireADLogin: true
      }).state('root.videos', {
        url: '/videos',
        views: {
          'container@': {
            templateUrl: 'app/components/videos/views/videos.html',
            controller: "VideosController",
            controllerAs: "vm"
          }
        },
        requireADLogin: true
      });

    $urlRouterProvider.otherwise('/');
  }

})();
