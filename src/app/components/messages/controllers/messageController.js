(function () {
    angular.module('OfficeHub').controller('MessageController', ['$state', '$stateParams', 'MessagesService', function ($state, $stateParams, MessagesService) {
        //#region Initialization
        //----------------------------------------------------------------------
        // Gets a reference to self
        //----------------------------------------------------------------------
        var vm = this;
        //#endregion

        //#region Private Members
        var messageId = null;
        //#endregion

        //#region Public Members
        //----------------------------------------------------------------------
        // The message that is used
        //----------------------------------------------------------------------
        vm.Message = null;
        //#endregion

        //#region Public Methods        
        vm.loadMessage = function() {
          //----------------------------------------------------------------------
          // Loads the message based on the current messageId
          //----------------------------------------------------------------------
          MessagesService.getMessage(messageId).then(function (message) {
            //----------------------------------------------------------------------
            // Update the view data
            //----------------------------------------------------------------------
            vm.Message = message;
            
            if (!vm.Message.IsRead) {
              //----------------------------------------------------------------------
              // If the email is not read, flag it as read
              //----------------------------------------------------------------------
              vm.toggleReadStatus();
            }
          }, function () {
              vm.Messages = null;
          });
        };
        
        vm.toggleReadStatus = function () {
          //----------------------------------------------------------------------
          // Sets the IsRead status
          //----------------------------------------------------------------------
          var data = {
            IsRead: !vm.Message.IsRead
          };

          //----------------------------------------------------------------------
          // Update the message to be considered read
          //----------------------------------------------------------------------
          MessagesService.updateMessage(messageId, data).then(function (message) {
            //----------------------------------------------------------------------
            // Update the view message
            //----------------------------------------------------------------------
            vm.Message = message;
          }, function () {
            //----------------------------------------------------------------------
            // If an error occured, do nothing
            //----------------------------------------------------------------------
          });
        };
        
         vm.deleteMessage = function () {
          //----------------------------------------------------------------------
          // Deletes a message
          //----------------------------------------------------------------------
          MessagesService.deleteMessage(messageId).then(function () {
            //----------------------------------------------------------------------
            // Redirect to the inbox view
            //----------------------------------------------------------------------
            $state.go("root.messages");
          }, function () {
            //----------------------------------------------------------------------
            // If an error occured, do nothing
            //----------------------------------------------------------------------
          });
        };
        
        vm.goToReply = function() {
          $state.go('root.messageReply', { id: vm.Message.Id })
        }
        
        vm.goToMessages = function() {
          $state.go('root.messages');
        }
        //#endregion

        //#region Private Methods
        var init = function () {
          messageId = $stateParams.id;
          
          //----------------------------------------------------------------------
          // Loads first page of the messages
          //----------------------------------------------------------------------
          vm.loadMessage();
        };
        //#endregion

        //#region Initialization
        init();
        //#endregion
    }]);
}());