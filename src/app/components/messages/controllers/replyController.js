(function () {
    angular.module('OfficeHub').controller('ReplyController', ['$state', '$stateParams', 'MessagesService', function ($state, $stateParams, MessagesService) {
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
        // The original message that is used
        //----------------------------------------------------------------------
        vm.Message = null;
        
        //----------------------------------------------------------------------
        // The adresses to send the email to
        //----------------------------------------------------------------------
        vm.ToAddresses = "";
        
        //----------------------------------------------------------------------
        // The adresses to cc the email to
        //----------------------------------------------------------------------
        vm.CcAddresses = "";

        //----------------------------------------------------------------------
        // The subject of the email
        //----------------------------------------------------------------------
        vm.Subject = "";

        //----------------------------------------------------------------------
        // The body the email
        //----------------------------------------------------------------------
        vm.Body = "";
        //#endregion

        //#region Public Methods    
        vm.sendMessage = function () {
          //----------------------------------------------------------------------
          // Sends the message to the recipients
          //----------------------------------------------------------------------
          MessagesService.sendMessage(vm.ToAddresses.split(';'), vm.Subject, vm.Body, true).then(function (data) {
            //----------------------------------------------------------------------
            // Redirects to the inbox
            //----------------------------------------------------------------------
            $state.go('root.messages');
          }, function () {
            //----------------------------------------------------------------------
            // If an error occured, do nothing
            //----------------------------------------------------------------------
          });
        };
             
        vm.cancel = function() {
          if(vm.Message) {
            $state.go('root.message', { id: vm.Message.Id });
          } else {
            $state.go('root.messages');
          }
          
        }
        //#endregion

        //#region Private Methods
        var init = function () {
          messageId = $stateParams.id;
          
          loadMessage().then(function () {
            //----------------------------------------------------------------------
            // Loads first page of the messages
            //----------------------------------------------------------------------
            createReply();
          });
        };
        
       var loadMessage = function() {
          //----------------------------------------------------------------------
          // Loads the message based on the current messageId
          //----------------------------------------------------------------------
          return MessagesService.getMessage(messageId).then(function (message) {
            //----------------------------------------------------------------------
            // Update the view data
            //----------------------------------------------------------------------
            vm.Message = message;
            
            if (!vm.Message.isRead) {
              //----------------------------------------------------------------------
              // If the email is not read, flag it as read
              //----------------------------------------------------------------------
              vm.toggleReadStatus();
            }
          }, function () {
              vm.Messages = null;
          });
        };
        
        var createReply = function () {
          //----------------------------------------------------------------------
          // Creates a reply of the requested message
          //----------------------------------------------------------------------
          return MessagesService.createReply(messageId).then(function (data) {
            //----------------------------------------------------------------------
            // Assign the view data to the reply received (title with RE:, etc.)
            //----------------------------------------------------------------------
            vm.ToAddresses = vm.Message.sender.emailAddress.address;
            vm.Subject = data.subject;
            vm.Body = "<br /><br />" + data.body.content;
          }, function () {
            //----------------------------------------------------------------------
            // If an error occured, do nothing
            //----------------------------------------------------------------------
          });
        };
        //#endregion

        //#region Initialization
        init();
        //#endregion
    }]);
}());