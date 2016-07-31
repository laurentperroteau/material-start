(function(){

    angular
        .module('users')
        .directive('userContact', [
            'userService', '$mdSidenav', '$mdBottomSheet', '$timeout', '$log',
            ContactDirective
        ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function ContactDirective( userService, $mdSidenav, $mdBottomSheet, $timeout, $log ) {

        var directive = {
            restrict: 'E',
            scope: {
                user: '<' // one way
            },
            bindToController: true, // enables the inherited properties to be bound to the Controller, not the $scope Object.
            templateUrl: 'src/contact/view/contact.html',
            controllerAs: 'contact',
            controller: ContactController
        };

        function ContactController() {

            var self = this;

            self.makeContact  = makeContact;

            /**
             * Show the Contact view in the bottom sheet
             */
            function makeContact(selectedUser) {

                $mdBottomSheet.show({
                    controllerAs  : "vm",
                    templateUrl   : 'src/contact/view/contactSheet.html',
                    controller    : [ '$mdBottomSheet', ContactSheetController],
                    parent        : angular.element(document.getElementById('content'))
                }).then(function(clickedItem) {
                    $log.debug( clickedItem.name + ' clicked!');
                });

                /**
                 * User ContactSheet controller
                 */
                function ContactSheetController( $mdBottomSheet ) {
                    this.user = selectedUser;
                    this.items = [
                        { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
                        { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
                        { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
                        { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
                    ];
                    this.contactUser = function(action) {
                        // The actually contact process has not been implemented...
                        // so just hide the bottomSheet

                        $mdBottomSheet.hide(action);
                    };
                }
            }
        }

        return directive;
    }
})();
