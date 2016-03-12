(function () {
    angular.module('OfficeHub').controller('InboxController', ['$scope', '$state', 'MessagesService', function ($scope, $state, MessagesService) {
        //#region Initialization
        //----------------------------------------------------------------------
        // Gets a reference to self
        //----------------------------------------------------------------------
        var vm = this;
        //#endregion

        //#region Private Members
        //----------------------------------------------------------------------
        // The amount of items the users sees per page
        //----------------------------------------------------------------------
        var pageSize = 10;
        var busy = false;
        var nextPage = 1;
        //#endregion

        //#region Public Members
        //----------------------------------------------------------------------
        // The messages that are bound to the inbox content
        //----------------------------------------------------------------------
        vm.Messages = [];

        //----------------------------------------------------------------------
        // Boolean value representing if there is a next page
        //----------------------------------------------------------------------
        vm.HasNextPage = true;
        
        //----------------------------------------------------------------------
        // Boolean value representing if the spinner is visible
        //----------------------------------------------------------------------
        vm.IsLoading = true;
        //#endregion

        //#region Public Methods        
        vm.getNextMessages = function() {
          //----------------------------------------------------------------------
          // Loads the next messages
          //----------------------------------------------------------------------
          if(nextPage * pageSize != this.Messages.length) {
            //----------------------------------------------------------------------
            // Don't process the request if it is actually occuring
            //----------------------------------------------------------------------
            if (busy) return;
            busy = true;
            
            //----------------------------------------------------------------------
            // Asks the service for the next page
            //----------------------------------------------------------------------
            MessagesService.getMessages(pageSize, nextPage).then(function (data) {
              nextPage = nextPage + 1;
              
              //----------------------------------------------------------------------
              // Pushes the new messages
              //----------------------------------------------------------------------
              angular.forEach(data.value, function(message) {
                vm.Messages.push(message);
              });
              
              //----------------------------------------------------------------------
              // Re-allows process of new messages
              //----------------------------------------------------------------------
              busy = false;
              
              //----------------------------------------------------------------------
              // Re-allows process of new messages
              //----------------------------------------------------------------------
              vm.IsLoading = false;
            }, function () {
              console.log("An error occured");
            });
          }
        };
        
        vm.toggleReadStatus = function (index) {
          //----------------------------------------------------------------------
          // Sets the IsRead status
          //----------------------------------------------------------------------
          var data = {
            IsRead: !vm.Messages[index].isRead
          };

          //----------------------------------------------------------------------
          // Update the message to be considered read
          //----------------------------------------------------------------------
          MessagesService.updateMessage(vm.Messages[index].id, data).then(function (message) {
            //----------------------------------------------------------------------
            // Update the view message
            //----------------------------------------------------------------------
            vm.Messages[index].isRead = message.isRead;             
          }, function () {
            //----------------------------------------------------------------------
            // If an error occured, do nothing
            //----------------------------------------------------------------------
          });
        };
        
        vm.reload = function() {
          vm.Messages = [];
          busy = false;
          nextPage = 1;
          
          vm.getNextMessages();
        }
        
        vm.goToMessage = function(message) {
          $state.go("root.message", { id: message.id });
        }
        
        vm.goToNewEmail = function() {
          $state.go("root.messageNew");
        }
        
        vm.deleteMessage = function (message) {
          //----------------------------------------------------------------------
          // Deletes a message
          //----------------------------------------------------------------------
          MessagesService.deleteMessage(message.id).then(function () {
            //----------------------------------------------------------------------
            // Deleting the local version of the message
            //----------------------------------------------------------------------
            var index = vm.Messages.indexOf(message);
            vm.Messages.splice(index, 1);   
            
            //----------------------------------------------------------------------
            // Redirect to the inbox view
            //----------------------------------------------------------------------
            $state.go("root.messages");
          }, function () {
            //----------------------------------------------------------------------
            // If an error occured, do nothing
            //----------------------------------------------------------------------
          });
        }
        //#endregion

        //#region Private Methods
        var init = function () {
            //----------------------------------------------------------------------
            // Loads first page of the messages
            //----------------------------------------------------------------------
            //vm.loadMessages();
        };

        var updateView = function (data) {
            //----------------------------------------------------------------------
            // Updates the content of the view
            //----------------------------------------------------------------------
            vm.Messages = data.value;
            vm.HasNextPage = data["@odata.nextLink"] != undefined && data["@odata.nextLink"] != null;
        }
        //#endregion

        //#region Initialization
        init();
        //#endregion
    }]);
}());