(function () {
  angular.module('OfficeHub').service('VideosService', ['$http', '$q', function ($http, $q) {
    //#region Initialization
    //----------------------------------------------------------------------
    // Gets a reference to self
    //----------------------------------------------------------------------
    var self = this;
    //#endregion

    //#region Private Properties
    //#endregion
    
    //#region Public Methods
    this.getChannels = function () {
      //----------------------------------------------------------------------
      // Use a promise to resolve the data from Office 365
      //----------------------------------------------------------------------
      var deferred = $q.defer();
      
      //----------------------------------------------------------------------
      // Build the REST Endpoint URL
      //----------------------------------------------------------------------
      var uri = "https://slevert365.sharepoint.com/portals/hub/_api/VideoService/Channels";

      //----------------------------------------------------------------------
      // Executes the query on Office 365
      //----------------------------------------------------------------------
      $http.get(uri).success(function (data, status, headers, config) {
        //----------------------------------------------------------------------
        // If the request is successful, resolve the returned data
        //----------------------------------------------------------------------
        deferred.resolve(data.value);
      }).error(function (data, status, headers, config) {
        //----------------------------------------------------------------------
        // If the request is unsuccessful, reject the promise
        //----------------------------------------------------------------------
        deferred.reject();
      });

      //----------------------------------------------------------------------
      // Returns the async promise
      //----------------------------------------------------------------------
      return deferred.promise;
    };
    
    this.getVideos = function (channelId) {
      //----------------------------------------------------------------------
      // Use a promise to resolve the data from Office 365
      //----------------------------------------------------------------------
      var deferred = $q.defer();
      
      //----------------------------------------------------------------------
      // Build the REST Endpoint URL
      //----------------------------------------------------------------------
      var uri = "https://slevert365.sharepoint.com/portals/hub/_api/VideoService/Channels(guid'" + channelId + "')/Videos";

      //----------------------------------------------------------------------
      // Executes the query on Office 365
      //----------------------------------------------------------------------
      $http.get(uri).success(function (data, status, headers, config) {
        //----------------------------------------------------------------------
        // If the request is successful, resolve the returned data
        //----------------------------------------------------------------------
        var videos = [];
        
        angular.forEach(data.value, function(video) {
          videos.push(buildVideo(video));
        });
        
        deferred.resolve(videos);    
      }).error(function (data, status, headers, config) {
        //----------------------------------------------------------------------
        // If the request is unsuccessful, reject the promise
        //----------------------------------------------------------------------
        deferred.reject();
      });

      //----------------------------------------------------------------------
      // Returns the async promise
      //----------------------------------------------------------------------
      return deferred.promise;
    };
    
    this.getPopularVideos = function () {
      //----------------------------------------------------------------------
      // Use a promise to resolve the data from Office 365
      //----------------------------------------------------------------------
      var deferred = $q.defer();
      
      //----------------------------------------------------------------------
      // Build the REST Endpoint URL
      //----------------------------------------------------------------------
      var uri = "https://slevert365.sharepoint.com/portals/hub/_api/VideoService/Search/Popular";

      //----------------------------------------------------------------------
      // Executes the query on Office 365
      //----------------------------------------------------------------------
      $http.get(uri).success(function (data, status, headers, config) {
        //----------------------------------------------------------------------
        // If the request is successful, resolve the returned data
        //----------------------------------------------------------------------
        var videos = [];
        
        angular.forEach(data.value, function(video) {
          videos.push(buildVideo(video));
        });
        
        deferred.resolve(videos);   
      }).error(function (data, status, headers, config) {
        //----------------------------------------------------------------------
        // If the request is unsuccessful, reject the promise
        //----------------------------------------------------------------------
        deferred.reject();
      });

      //----------------------------------------------------------------------
      // Returns the async promise
      //----------------------------------------------------------------------
      return deferred.promise;
    };
    //#endregion
    
    
    //#region Private Methods
    var buildVideo = function(video) {
      if(video) {
        video.PlaybackUrl = getPlaybackUrl(video);
      }
      
      return video;
    }
    
    var getPlaybackUrl = function(video) {
      var playbackUrl = "";
      
      if(video) {
        playbackUrl = "https://slevert365.sharepoint.com/portals/hub/_layouts/15/PointPublishing.aspx?app=video&p=p&chid=" + video.ChannelID + "&vid=" + video.ID;  
      }
      
      return playbackUrl;      
    }
    //#endregion
  }]);
}());