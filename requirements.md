# Submission Requirements
## Project Description
- A high level architectural overview of your web application. e.g. names, relationships and purposes of all components and relevant data models
Photogal uses a relational database to store information on its users, the likes, and edits made to photos. The likes and edits table both have a foreign key referencing a unique user id on the users table. The users table stores information about the user including login credentials. The likes table stores all likes made any user and any photo, the relationship is defined be the image ID and the liker's user ID. The edits table, similar to the likes table, stores the filter options chosen by the user and the user's ID. An API provides images and their related data which powers the gallery and search.

- Brief description of the architectural design pattern that you leveraged (MVC, MVP, MVVM)
Photogal implements an MVC architectural design pattern with PostgresSQL hosted on AWS as the database (M), Express/NodeJS in the backend acting as the controller and routing requests and results (C), and ReactJS as the frontend, constantly rendering the returned information to the viewers (V).

- Screenshots of each View and descriptions of the overall user flow as well as any place that you made distinct design decisions.  (Screenshots can be taken via any screenshot capture application or native methods).
The user will start at the login or signup page and be redirected to the home page. On the home page is a simple nav bar with logout functionality, a search bar for specific queries, and the photo gallery that displays one of 4 components at any time. The home component fetches random images to display, the edits page holds all of the users edited photos, the likes hold all of the phots the user has liked, and the search component displays result images from the queries. Infinite scroll is enaabled on both the home and search image displays.

To minimize API calls and fetching the same data, I decided to store the relevant information for each image saved to the likes and edit tables. For example, if a user makes an edit to a photo,
     the image ID (which can be used to fetch the entire image data object), 
     the image link (to access the photo itself), 
     the description (for accessibility concerns), 
     and the filter options the user has chosen are saved.

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