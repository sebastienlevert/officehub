(function () {
  angular.module('OfficeHub').service('FilesService', ['$http', '$q', function ($http, $q) {
    //#region Initialization
    //----------------------------------------------------------------------
    // Gets a reference to self
    //----------------------------------------------------------------------
    var self = this;
    //#endregion

    //#region Private Properties
    //#endregion
    
    //#region Public Methods
    this.getFiles = function (folderId) {
      //----------------------------------------------------------------------
      // Use a promise to resolve the data from Office 365
      //----------------------------------------------------------------------
      var deferred = $q.defer();

      //----------------------------------------------------------------------
      // Build the REST Endpoint URL
      //----------------------------------------------------------------------
      var uri = "https://graph.microsoft.com/v1.0/me/drive";

      //----------------------------------------------------------------------
      // If a folderId is specified, append the folderId to get its children files
      //----------------------------------------------------------------------
      if (folderId) {
        uri = uri += "/items/" + folderId + "/children";
      } else {
        uri = uri += "/root/children";
      }

      //----------------------------------------------------------------------
      // Executes the query on Office 365
      //----------------------------------------------------------------------
      $http.get(uri).success(function (data, status, headers, config) {
        //----------------------------------------------------------------------
        // If the request is successful, resolve the returned data
        //----------------------------------------------------------------------
        var files = [];
        
        if(data.value) {
          angular.forEach(data.value, function(file) {
            files.push(buildFile(file));
          });
        }
        
        deferred.resolve(files);
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

    this.getFile = function (fileId) {
      //----------------------------------------------------------------------
      // Use a promise to resolve the data from Office 365
      //----------------------------------------------------------------------
      var deferred = $q.defer();

      //----------------------------------------------------------------------
      // Build the REST Endpoint URL
      //----------------------------------------------------------------------
      var uri = "https://graph.microsoft.com/beta/me/files/" + fileId;
      
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
    
    
    //#region Private Methods
    var buildFile = function(file) {
      if(file.file) {
        if(/.*&docid=0(.*)&expiration.*/.exec(file["@microsoft.graph.downloadUrl"])[1]) {
          file.webPlayerUrl = file.webUrl + '?d=w' + /.*&docid=0(.*)&expiration.*/.exec(file["@microsoft.graph.downloadUrl"])[1];  
        }
        
        file.kilobyteSize = file.size > 0 ? Math.ceil(file.size / 1024) + " Kb" : "0 Kb";
      }
      
      return file;
    }
    //#endregion
  }]);
}());