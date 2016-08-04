(function(){

    angular
        .module('users')
        .directive('userList', [
            '$log',
            UserListDirective
        ]);

    /**
     * @constructor
     * @return {object} directive
     */
    function UserListDirective() {

        var directive = {
            restrict: 'E',
            scope: {
                users: '<', // one way
                onUserSelected: '&'
            },
            bindToController: true, // enables the inherited properties to be bound to the Controller, not the $scope Object.
            templateUrl: 'src/users/view/userList.html',
            controllerAs: 'userList',
            controller: UserListController
        };

        /**
         * Main Controller for <user-contact> directive
         * @param $log
         */
        function UserListController( $log ) {

            var self = this;

            self.selected     = null;
            self.selectUser   = selectUser;

            /**
             * Select the current avatars
             * @param {object} user
             */
            function selectUser ( user ) {
                self.selected = angular.isNumber(user) ? self.users[user] : user;

                // Communicate user select on parent
                self.onUserSelected( {userSelected: self.selected} );
            }
        }

        return directive;
    }
})();
