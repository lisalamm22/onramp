# Submission Requirements
## Project Description
- A high level architectural overview of your web application. e.g. names, relationships and purposes of all components and relevant data models

- Brief description of the architectural design pattern that you leveraged (MVC, MVP, MVVM)
- Screenshots of each View and descriptions of the overall user flow as well as any place that you made distinct design decisions.  (Screenshots can be taken via any screenshot capture application or native methods).


## Project Requirements
Please list examples of how your project meets the following requirements below:
- [x] Use a modern JS Library/Framework like React, Angular, etc. We suggest using React.js.
Photogal uses React JS for frontend, Express/NodeJS coupled with a PostgreSQL database hosted on AWS for an accessible backend.

- [x] Create an application that can be interacted with in a minimum of three different ways by the user.
Photogal viewers can interact wtih the application in a minimum of three ways. Besides the ability to create their own personal account, the main features are:
    - like photos and view them all on one page
    - edit photos, save the changes, and view them all on one page
    - search for photos with keywords

- [x] Use of at least one Service.
Photogal uses the Unsplash API for their abundance of high quality and artistic photos.

- [x] The usage of a specified architectural pattern (MVC, MVP, MVVM,  etc.)
Photogal implements the MVC architectural pattern. The models, a representatin of the database, interacts with Express/NodeJS via controller routes. GET, POST, and DELETE routes are implemented in this controller. The views fetch and post data to these routes from the user which are then communicated to the database.

- [x] Use of a [REST API](https://medium.com/@arteko/the-best-way-to-use-rest-apis-in-swift-95e10696c980).
To access user information for account login and registration to saving user edits on photos to remembering their favorite photos, we use REST APIs.
For example, to get all the photos a user likes, it would be a GET /user/likes.   

- [x] Usage of at least 5 UI components from the [material-ui/@core](https://material-ui.com/) library (if you are not using React, a comparable UI library is acceptable)
Photogal makes much usage of the material-ui library. Component APIs that have been used include:
    -Button (seen on login/logout, used in the LikeButton, edit button, navigation tabs on the home page(home, edit, like pages ))
    -Container (used on the entire body of the page)
    -Textfield (used for inputs on login/signup forms and search bar)
    -GridList / GridListTile ( allows for collage effect of photo display)
    -Modal (used to view and edit photos)
    -Fade (for smoother transitions between opening and closign of modals)

- [x] An example of a reusable UI component that you have created and used in the app. This should be different than the 5 UI components from the vendor library.
A like button used in both the photo viewing modal and photo editing modal. The like button can simply work based on image ID's so it can be an easily and readily reusable component.