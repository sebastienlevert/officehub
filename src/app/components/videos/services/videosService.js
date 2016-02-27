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
        var uri = "https://sebastienlevert.sharepoint.com/portals/hub/_api/VideoService/Channels";

        //----------------------------------------------------------------------
        // Executes the query on Office 365
        //----------------------------------------------------------------------
        $http.get(uri).success(function (data, status, headers, config) {
          //----------------------------------------------------------------------
          // If the request is successful, resolve the returned data
          //----------------------------------------------------------------------
          deferred.resolve(data);
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
  }]);
}());