(function () {
  angular.module('OfficeHub').controller('VideosController', ['$scope', '$state', '$log', 'VideosService', function ($scope, $state, $log, VideosService) {
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
    vm.PopularVideos = [];
    vm.Channels = [];
    //#endregion

    //#region Public Methods 
    //#endregion

    //#region Private Methods
    var getChannels = function() {
      VideosService.getChannels().then(function (channels) {
        vm.Channels = channels;
        
        angular.forEach(vm.Channels, function(channel) {
          getChannelVideos(channel.Id);
        });
      }, function () {
        $log.error("An error occured");
      });
    };
    
    var getPopularVideos = function() {
      VideosService.getPopularVideos().then(function (popularVideos) {
        angular.forEach(popularVideos, function(popularVideo) {
          vm.PopularVideos.push(popularVideo);
        });
      }, function () {
        $log.error("An error occured");
      });
    }
    
    var getChannelVideos = function(channelId) {
      VideosService.getVideos(channelId).then(function (videos) {
        angular.forEach(videos, function(video) {
          vm.Videos.push(video);
        });
      }, function () {
        $log.error("An error occured");
      });
    };
    
    var init = function () {
      getPopularVideos();
      getChannels();
    };
    //#endregion

    //#region Initialization
    init();
    //#endregion
  }]);
}());