// Load the custom app ES6 modules

import UsersService from 'src/users/services/UsersDataService';
import UsersController from 'src/users/controllers/UsersController';

import UsersList from 'src/users/list/UsersList';
import UserDetails from 'src/users/details/UserDetails';

// Define the Angular 'users' module

export default angular
  .module("users", ['ngMaterial'])
   
  .component( UsersList.name, UsersList.config )
  .component( UserDetails.name, UserDetails.config )
  
  .service("usersService", UsersService)
  .controller("UsersController", UsersController);
