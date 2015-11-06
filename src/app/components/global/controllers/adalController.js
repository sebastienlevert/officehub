(function () {
  angular.module('OfficeHub').controller('AdalController', ['adalAuthenticationService', 'UsersService', function (adalAuthenticationService, UsersService) {
    //#region Initialization
    //----------------------------------------------------------------------
    // Gets a reference to self
    //----------------------------------------------------------------------
    var vm = this;
    //#endregion

    //#region Private Members
    //#endregion

    //#region Public Members
    vm.userPhoto = ""
    //#endregion

    //#region Public Methods
    vm.login = function () {
      //----------------------------------------------------------------------
      // Invokes the login function of the ADAL library
      //----------------------------------------------------------------------
      adalAuthenticationService.login();
    };

    vm.logout = function () {
      //----------------------------------------------------------------------
      // Invokes the logout function of the ADAL library
      //----------------------------------------------------------------------
      adalAuthenticationService.logOut();
    };
    //#endregion

    //#region Private Methods
    var init = function() {
      vm.userPhoto = getUserPhoto();
    };
    
    var getUserPhoto = function() {
      //----------------------------------------------------------------------
      // Update the message to be considered read
      //----------------------------------------------------------------------
      UsersService.getUserPhoto("96X96").then(function (photo) {
        //----------------------------------------------------------------------
        // Update the view message
        //----------------------------------------------------------------------
        vm.userPhoto = photo;      
      }, function () {
        //----------------------------------------------------------------------
        // If an error occured, do nothing
        //----------------------------------------------------------------------
      });
    };
    //#endregion

    //#region Initialization
    init();
    //#endregion
  }]);
}());