export default {
  name: 'usersList',
  config: {
    bindings: { users: '<', selected: '<', showDetails: '&onSelected' },
    templateUrl: 'src/users/list/UsersList.html'
  }
}
