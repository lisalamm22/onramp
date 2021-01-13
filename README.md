
# P H O T O G A L

## Overview 📸

A minimalist app that provides you with only the best of Unsplash photography. High quality photos you can browse for days on end, or search for something to inspire you. The app also allows you to save the photos you really love and even edit them in-app!


## MVPs 🔎

1. New account creation, login
- Users can sign up, sign in, log out
- Users can't use certain features without logging in (liking photos, editing photos, searching for photos)
2. Like CRUD
- Logged in users can like a photo, unlike a photo, see all photos they have liked previously
3. Keyword search for photos
- Gallery will show images relevant to keywords
4. Edit photos in app
- Users can update certain qualities of a photo such as brightness or contrast
- Users can save the values of these qualities
- Users can re-view all of their edited photos
5. Retrieve random photos
- Users can scroll continuously through random photos

### Schema
Users
Likes
Edits

### Get Started 🌟
To start the client:
```
cd client
npm install # or `yarn`
npm start # or `yarn start`
```

The client will run on http://localhost:3000. 

To start the server:
```
cd server
npm install # or `yarn`
npm start # or `yarn start`
```

The server will run on http://localhost:8080. 

You can view the application on the browswer at http://localhost:3000/. 

### Architecture Pattern

Photogal implements an MVC architectural design pattern with PostgresSQL hosted on AWS as the database (M), Express/NodeJS in the backend acting as the controller and routing requests and results (C), and ReactJS as the frontend, constantly rendering the returned information to the viewers (V).

#### UI Design
![alt_text](https://user-images.githubusercontent.com/68566126/104473653-33a1f800-558b-11eb-85bc-35550bc3a311.png "Photogal Login")
![alt_text](https://user-images.githubusercontent.com/68566126/104474668-3ea95800-558c-11eb-9e41-e6244ca746a2.png "Photogal Home")
![alt_text](https://user-images.githubusercontent.com/68566126/104474694-4406a280-558c-11eb-8ef1-9f5fd2d27b07.png "Photogal Search and Like")
![alt_text](https://user-images.githubusercontent.com/68566126/104474744-4ff26480-558c-11eb-8461-80be91457d1c.png "Photogal Edit")


#### UI Design

Accessibility is increasingly becoming a critical component in developing website and web experiences. Your web app should include thoughtful design around how users using screen readers or with impaired vision might experience your app.




#### Project Repository Description

Each project submission must include a README file providing an overview of the web application, instructions to install and start the app, and details the app's overall architecture pattern. There should also be documentation to describe the expected payload and response for at least one route of the REST API.

We've provided some barebones directories to get you started. To start the client:
```
cd client
npm install # or `yarn`
npm start # or `yarn start`
```

The client will run on http://localhost:3000. We created this directory using `create-react-app` but if you are not using React, feel free to remove these files and implement a framework of your choice.

To start the server:
```
cd server
npm install # or `yarn`
npm start # or `yarn start`
```

The server will run on http://localhost:8080. There are two example routes that have been provided: `/api` and `/api/users`.


Screenshots of the app where distinct design decisions were made should also be included. This task assesses the critical competency of communicating and documenting technical concepts.


## Submission Information 🚀

#### Submission Format

This repository will be your starting point. Please download (not clone or fork) this Github repository [onramp-fullstack-project](https://github.com/onramp-io/onramp-fullstack-project) and upload changes to a newly created repository. Once your web application has been completed, you'll be submitting a link to the new repository you created. Prior to submitting your project, you should update the [requirements.md](requirements.md) file to provide the following information:
- A high level architectural overview of your web application. e.g. names, relationships and purposes of all components and relevant data models
- Brief description of the architectural design pattern that you leveraged.
- Screenshots of each View and descriptions of the overall user flow as well as any place that you made distinct design decisions.  (Screenshots can be taken via any screenshot capture application or native methods).


#### Submission Deadline + Process

You must submit your project by 9:00am PST/12:00pm EST on January 13, 2020 using [this form](https://docs.google.com/forms/d/e/1FAIpQLSdFBo328et9VHd04fFTZ7MRfIUD5le-jimyl0UccCs3IBYHoQ/viewform). Be sure that your project is viewable by the Onramp team.

Once you’ve submitted your project, you are expected to stop working on it. Any commits that occur after submission or the deadline will not be reviewed.


## Additional Resources 📚

**Onramp Resources:**

Please use the modules and resources in the [Twitch Training Plan](https://www.onramp.io/training/5fb6cf7eac4a67001766281d) for resources and exercises on TypeScript and Version Control.

**Other Resources:**
- [Website Design & Development](https://envisionitagency.com/blog/2018/04/best-practices-for-web-development/)
- [5 Ways to Achieve better accessibility in UI Design](https://www.justinmind.com/blog/prototyping-accessibility-in-web-and-mobile-ui-design/#:~:text=Accessibility%20in%20UI%20design%20leads,all%20users%2C%20regardless%20of%20ability.&text=As%20designers%20who%20want%20to,in%20a%20way%20that's%20accessible.)
- [Ally stands for Accessibility](https://www.a11yproject.com/)
- [MDN: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A Model View Controller Pattern for React](https://blog.testdouble.com/posts/2019-11-04-react-mvc/)
- [Separation of Concerns](https://youtu.be/VtF6aebWe58)
- [Typescript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Typescript Best Practices](https://engineering.zalando.com/posts/2019/02/typescript-best-practices.html)
- [Lyfe Marketing Web Design Practice](https://www.lyfemarketing.com/blog/web-design-best-practices/)
