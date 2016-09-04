
describe('userService', function () {
  var deferred, $rootScope, userService;

  beforeEach(module('users'));

  beforeEach(function () {
    inject(function ($q, _$rootScope_, _userService_) {
      $rootScope = _$rootScope_;
      deferred = $q.defer();
      userService = _userService_;
    });
  });

  describe('return an array', function() {

    it('with length of 6', function () {

      userService.loadAllUsers().then( function( users ) {
        expect(users.length).toEqual(6);
      });
      deferred.resolve();
      $rootScope.$digest();
    });  

    it('with first object name "Lia Lugo"', function () {

      userService.loadAllUsers().then( function( users ) {
        expect( users[0].name ).toEqual('Lia Lugo');
      });
      deferred.resolve();
      $rootScope.$digest();
    });
  });
});