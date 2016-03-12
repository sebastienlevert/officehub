(function () {
  angular.module('OfficeHub').controller('FilesController', ['$scope', '$state', '$stateParams', '$log', 'FilesService', function ($scope, $state, $stateParams, $log, FilesService) {
    //#region Initialization
    //----------------------------------------------------------------------
    // Gets a reference to self
    //----------------------------------------------------------------------
    var vm = this;
    //#endregion

    //#region Private Members
    //#endregion

    //#region Public Members
    vm.Files = [];
    vm.IsLoading = true;
    //#endregion

    //#region Public Methods 
    //#endregion

    //#region Private Methods
    var getFiles = function(folderId) {                    
      FilesService.getFiles(folderId).then(function (files) {
        vm.Files = files;
        vm.IsLoading = false;
      }, function () {
        $log.error("An error occured");
      });
    };
    
    var init = function () {
      getFiles($stateParams.id);
    };
    //#endregion

    //#region Initialization
    init();
    //#endregion
  }]);
}());