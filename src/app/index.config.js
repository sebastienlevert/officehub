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
      //clientId: '8678d1cb-82dc-4520-a750-71d1e4f38f57',
      //tenant: '87ee87de-2492-4b10-a955-a746ddc30e99',
      //clientId: '1bf8257c-d542-4aad-9d1b-a010c7c5a5d1',
      clientId: '269716d2-3a91-4d9c-a737-869040658f63',      
      postLogoutRedirectUri: 'http://localhost:3000',
      endpoints: {
          'https://sebastienlevert.sharepoint.com/portals/hub/_api': 'https://sebastienlevert.sharepoint.com'
      }
    }, $httpProvider);
            
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();