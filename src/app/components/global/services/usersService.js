(function () {
  angular.module('OfficeHub').service('UsersService', ['$http', '$q', function ($http, $q) {
    //#region Initialization
    //----------------------------------------------------------------------
    // Gets a reference to self
    //----------------------------------------------------------------------
    var self = this;
    //#endregion

    //#region Private Properties
    //#endregion
    
    //#region Public Methods
    this.getUserPhoto = function (format) {
      //----------------------------------------------------------------------
      // Use a promise to resolve the data from Office 365
      //----------------------------------------------------------------------
      var deferred = $q.defer();

      //----------------------------------------------------------------------
      // Build the REST Endpoint URL
      //----------------------------------------------------------------------
      var uri = "https://graph.microsoft.com/beta/me/Photos/" + format + "/$value";

      //----------------------------------------------------------------------
      // Executes the query on Office 365
      //----------------------------------------------------------------------
      $http.get(uri, { responseType: 'blob' }).success(function (data, status, headers, config) {
        //----------------------------------------------------------------------
        // If the request is successful, resolve the returned data
        //----------------------------------------------------------------------
        var url = window.URL || window.webkitURL;
        var blobUrl = url.createObjectURL(data);
        deferred.resolve(blobUrl);
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