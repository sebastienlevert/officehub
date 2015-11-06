(function() {
  'use strict';

  angular
    .module('OfficeHub')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider, adalAuthenticationServiceProvider) {
    
    //----------------------------------------------------------------------
    // ADAL configuration
    //----------------------------------------------------------------------
    adalAuthenticationServiceProvider.init({
      //tenant: 'a204560f-5ffc-4cf5-a723-22981d99c4f9',
      //clientId: '6bfd5aea-41ff-448a-96d3-6398844d8e75',
      clientId: '8678d1cb-82dc-4520-a750-71d1e4f38f57',
      postLogoutRedirectUri: 'http://localhost:3000',
      endpoints: {
          'https://graph.microsoft.com': 'https://graph.microsoft.com'
      }
    }, $httpProvider);
            
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();