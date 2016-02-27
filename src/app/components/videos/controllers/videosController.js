(function () {
    angular.module('OfficeHub').controller('VideosController', ['$scope', '$state', 'VideosService', function ($scope, $state, VideosService) {
        //#region Initialization
        //----------------------------------------------------------------------
        // Gets a reference to self
        //----------------------------------------------------------------------
        var vm = this;
        //#endregion

        //#region Private Members
        //#endregion

        //#region Public Members
        //----------------------------------------------------------------------
        // The videos that are available
        //----------------------------------------------------------------------
        vm.Videos = [];
        //#endregion

        //#region Public Methods        
        
        //#endregion

        //#region Private Methods
        var getChannels = function() {
            VideosService.getChannels().then(function (channels) {
                console.log(channels);
            }, function () {
              console.log("An error occured");
            });
        };
        
        var init = function () {
            getChannels();
        };
        //#endregion

        //#region Initialization
        init();
        //#endregion
    }]);
}());