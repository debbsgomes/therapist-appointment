# TherapistAppointment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4, but updated to 16.1.2 because of dependency conflicts. 

JSON-server was used as a mock server to run with the app, to run the server go to the project root directory and run `npx json-server --watch db.json`. It will start the JSON server and load the data from the db.json file. The server will be available at `http://localhost:3000`. Also don't forget to install it, run this command `npm install -g json-server`. It simulates an API RESTful from a JSON file.

You need to have Node.js in the latest version installed.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

After initializing the application you will be welcomed at the first screen of the project, a home page, there you will have a log in button, a signup button, and the profile of 5 professionals available in the application. You can just access the professional information if logged in. So you can either sign up with your own email and password or just use my user information: email: debbsgomes@gmail.com password: 12345678.
After you get into the doctor profile you will have their bio and a calendar to appoint a session, you can then click on one of the available days and will be sent to the next page to submit a form with your information and submit the reservation. (`This last step will be finished in the future`).

## Project Structure

```
├───app
│   ├───appointment-form
│   ├───home
│   ├───services
│   ├───shared
│   │   └───components
│   │       ├───date-picker
│   │       ├───navibar-login
│   │       ├───rating
│   │       └───website-footer
│   └───therapist-profile
└───assets
```


src/app/components: Contains the application components.
src/app/services: Contains the services used to interact with the API and manipulate the data.
src/app/models: Contains the data models used in the application.
src/app/views: Contains the application's views.
src/app/view models: Contains the view models used to separate the presentation logic from the business logic.

The project was built using the MVVM Design Patter. The data binding and event handling in the template (View) connect to the ViewModel, allowing the View to display and update data and trigger actions through the ViewModel. The ViewModel is responsible for updating the Model based on user interactions or other business logic.

In the package.json file, you will find the following scripts available:

src/app/components: Contains the application components.
src/app/services: Contains the services used to interact with the API and manipulate the data.
src/app/models: Contains the data models used in the application.
src/app/views: Contains the application's views.
src/app/viewmodels: Contains the view models used to separate the presentation logic from the business logic.

## External dependencies

Be sure to have those libraries and frameworks installed to be able to run the project: 

Angular Material: Install by running this command `ng add @angular/material`. It was used to build the date picker/calendar.
Jest: Install by running `npm install --save-dev jest` and this `npm install jest-localstorage-mock --save-dev`. It was used to do the unit tests instead of Karma.
Angular Star Rating: Install by running `npm install angular-star-rating --save`. It was used to do the star rating in the therapist profile.
RXJS: Install by running `npm install rxjs --save`. It was used throughout the whole project.
TypeScript: Install by running `npm install -g typescript`. You need to have this one globally installed to be able to create any Angular project.
UUID: Install by running `npm install uuid`. It was used to create the random IDs for the sign-up created profiles.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. You can also run `npm start` to build and serve at the same time.

## Running unit tests

Run `jest --coverage` to do tests using Jest. You can also use the command `npm run test`. Follow this tutorial to set up Jest appropriately in your Angular project `https://medium.com/@kyjungok/setup-jest-in-angular-application-22b22609cbcd`.

## Conclusion

Probably going to add a Shared Module in the future to control the flux of components and modules and apply E2E tests in a v2. 

Youtube video showing how it works: https://youtu.be/LYrVJG2cv9k


