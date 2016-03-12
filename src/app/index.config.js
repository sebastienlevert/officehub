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
      //clientId: 'bccb07af-5dd0-4874-9415-5b15d0315b2c',
      //clientId: '87f42411-0852-4f1d-aae3-025597124332',
      clientId: 'daeccfdf-b5ab-4e02-8510-e33db9fbeb2a',
      tenant: 'slevert365.onmicrosoft.com',
      postLogoutRedirectUri: 'https://localhost:8443',
      endpoints: {
          'https://graph.microsoft.com': 'https://graph.microsoft.com',
          'https://slevert365.sharepoint.com': 'https://slevert365.sharepoint.com'
      }
    }, $httpProvider);
            
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();