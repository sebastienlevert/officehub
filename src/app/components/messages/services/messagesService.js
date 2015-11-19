(function () {
    angular.module('OfficeHub').service('MessagesService', ['$http', '$q', function ($http, $q) {
      //#region Initialization
      //----------------------------------------------------------------------
      // Gets a reference to self
      //----------------------------------------------------------------------
      var self = this;
      //#endregion

      //#region Private Properties
      //#endregion
      
      //#region Public Methods
      this.getMessages = function (pageSize, pageNumber) {
        //----------------------------------------------------------------------
        // Use a promise to resolve the data from Office 365
        //----------------------------------------------------------------------
        var deferred = $q.defer();
        
            //----------------------------------------------------------------------
        // Build the REST Endpoint URL
        //----------------------------------------------------------------------
        var uri = "https://graph.microsoft.com/v1.0/me/MailFolders/Inbox/messages?&top=" + pageSize;

        //----------------------------------------------------------------------
        // Builds the query to skip the elements of the past page
        //----------------------------------------------------------------------
        if (pageNumber > 1)
        {
          uri += "&$skip=" + ((pageNumber - 1) * pageSize);
        }

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

      this.getMessage = function (messageId) {
        //----------------------------------------------------------------------
        // Use a promise to resolve the data from Office 365
        //----------------------------------------------------------------------
        var deferred = $q.defer();

        //----------------------------------------------------------------------
        // Build the REST Endpoint URL
        //----------------------------------------------------------------------
        var uri = "https://graph.microsoft.com/v1.0/me/messages/" + messageId;

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

      this.updateMessage = function (messageId, data) {
        //----------------------------------------------------------------------
        // Use a promise to resolve the data from Office 365
        //----------------------------------------------------------------------
        var deferred = $q.defer();

        //----------------------------------------------------------------------
        // Build the REST Endpoint URL
        //----------------------------------------------------------------------
        var uri = "https://graph.microsoft.com/v1.0/me/messages/" + messageId;

        //----------------------------------------------------------------------
        // Executes the query on Office 365
        //----------------------------------------------------------------------
        $http.patch(uri, data).success(function (data, status, headers, config) {
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

      this.deleteMessage = function (messageId) {
        //----------------------------------------------------------------------
        // Use a promise to resolve the data from Office 365
        //----------------------------------------------------------------------
        var deferred = $q.defer();

        //----------------------------------------------------------------------
        // Build the REST Endpoint URL
        //----------------------------------------------------------------------
        var uri = "https://graph.microsoft.com/v1.0/me/messages/" + messageId;

        //----------------------------------------------------------------------
        // Executes the query on Office 365
        //----------------------------------------------------------------------
      $http.delete(uri).success(function (data, status, headers, config) {
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

    this.sendMessage = function (recipients, subject, body, saveToSentItems) {
      //----------------------------------------------------------------------
      // Use a promise to resolve the data from Office 365
      //----------------------------------------------------------------------
      var deferred = $q.defer();

      //----------------------------------------------------------------------
      // Build the REST Endpoint URL
      //----------------------------------------------------------------------
      var uri = "https://graph.microsoft.com/v1.0/me/microsoft.graph.sendMail";

      //----------------------------------------------------------------------
      // Builds the necessary data object to send to the send an email
      //----------------------------------------------------------------------
      var data = {
        Message: {
          Subject: subject,
          Body: {
            ContentType: "HTML",
            Content: body
          },
          ToRecipients: []
        },
        SaveToSentItems: saveToSentItems
      }

      //----------------------------------------------------------------------
      // Adds the recipients to the message data
      //----------------------------------------------------------------------
      angular.forEach(recipients, function (recipient) {
        data.Message.ToRecipients.push({
          EmailAddress: {
            Address: recipient.trim()
          }
        });
      });

      //----------------------------------------------------------------------
      // Executes the query on Office 365
      //----------------------------------------------------------------------
      $http.post(uri, data).success(function (data, status, headers, config) {
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

    this.createReply = function (messageId) {
      //----------------------------------------------------------------------
      // Use a promise to resolve the data from Office 365
      //----------------------------------------------------------------------
      var deferred = $q.defer();

      //----------------------------------------------------------------------
      // Build the REST Endpoint URL
      //----------------------------------------------------------------------
      var uri = "https://graph.microsoft.com/v1.0/me/messages/" + messageId + "/CreateReply";

      //----------------------------------------------------------------------
      // Executes the query on Office 365
      //----------------------------------------------------------------------
      $http.post(uri).success(function (data, status, headers, config) {
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