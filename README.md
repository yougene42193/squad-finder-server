# Squad-Finder-Server
## API Documentation
### /users 
* POST / creates a new user with a username and password. Verifies if the username is already taken and if the password fulfills the requirements.
### /profiles
* GET / gets all of the profiles that have been created by the users.
* POST / creates a new profile with the requirements of username, platform, game and region. Then lists that profile into the list.
## Built with
* NodeJS
* Knex
* Bcryptjs
* Chai
## Future Implementations
* Add edit profile
* Add favorites list
