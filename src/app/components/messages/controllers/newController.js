(function () {
    angular.module('OfficeHub').controller('NewMessageController', ['$state', 'MessagesService', function ($state, MessagesService) {
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
          $state.go('root.messages');          
        }
        //#endregion

        //#region Private Methods
        //#endregion

        //#region Initialization
        //#endregion
    }]);
}());