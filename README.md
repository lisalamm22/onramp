
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

## Schema
### Postgres Database Schema

#### `users`

| column name       | data type | details                   |
| :---------------- | :-------: | :------------------------ |
| `id`              |   uuid    | not null, primary key     |
| `useremail`       |  string   | not null                  |
| `username`        |  string   | not null                  |
| `password`        |  string   | not null                  |
| `created_at`      | datetime  | not null                  |
| `updated_at`      | datetime  | not null                  |


#### `likes`

| column name  | data type | details                        |
|--------------|-----------|--------------------------------|
| `id`         | integer   | not null, primary key          |
| `image_id`   | string    | not null                       |
| `image_link` | string    | not null                       |
| `image_desc` | string    | not null                       |
| `liker_id`   | uuid      | not null, foreign key          |
| `created_at` | datetime  | not null                       |
| `updated_at` | datetime  | not null                       |

- `liker_id` references `users`

#### `edits`

| column name  | data type | details                        |
|--------------|-----------|--------------------------------|
| `id`         | integer   | not null, primary key          |
| `image_id`   | string    | not null                       |
| `image_link` | string    | not null                       |
| `image_desc` | string    | not null                       |
| `options`    | string    | not null                       |
| `editor_id`  | uuid      | not null, foreign key          |
| `created_at` | datetime  | not null                       |
| `updated_at` | datetime  | not null                       |

- `editor_id` references `users`

## Routes
The photogal app utilizes a few different routes but the two sets that are used most often are fetching/post to likes and fetching/posting to edits.
An example would be retrieving all edits for one user, the route would be `GET`/user/edits which would return an object similar to:
```
{
    "edits": [
        {
            "image": "YA5_CHPxyQw",
            "imagelink": "https://images.unsplash.com/photo-1608483284390-f9c10d0bb692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxOTczMjN8MHwxfHJhbmRvbXx8fHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080",
            "options": "{\"filter\":\"brightness(1) contrast(1) saturate(1) grayscale(0) sepia(0) hue-rotate(0deg) blur(0px)\"}",
            "description": "dead sea nature"
        },
        {
            "image": "5wxay7D7yjE",
            "imagelink": "https://images.unsplash.com/photo-1503441669932-76d3a4625eb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxOTczMjN8MHwxfHNlYXJjaHwxNHx8Y2xvdWRzfGVufDB8fHw&ixlib=rb-1.2.1&q=80&w=1080",
            "options": "{\"filter\":\"brightness(1.33) contrast(1.19) saturate(0.63) grayscale(0) sepia(0) hue-rotate(0deg) blur(0px)\"}",
            "description": "We are going to fly - higher than high!"
        },
        {
            "image": "Kwi60PbAM9I",
            "imagelink": "https://images.unsplash.com/photo-1486016006115-74a41448aea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxOTczMjN8MHwxfHNlYXJjaHwyfHxyYWlufGVufDB8fHw&ixlib=rb-1.2.1&q=80&w=1080",
            "options": "{\"filter\":\"brightness(1.13) contrast(0.77) saturate(1.35) grayscale(0.27) sepia(0.12) hue-rotate(0deg) blur(0px)\"}",
            "description": "It’s raining"
        },
        {
            "image": "Kwi60PbAM9I",
            "imagelink": "https://images.unsplash.com/photo-1486016006115-74a41448aea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxOTczMjN8MHwxfHNlYXJjaHwyfHxyYWlufGVufDB8fHw&ixlib=rb-1.2.1&q=80&w=1080",
            "options": "{\"filter\":\"brightness(1.23) contrast(0.85) saturate(0.82) grayscale(0.14) sepia(0) hue-rotate(16deg) blur(0px)\"}",
            "description": "It’s raining"
        }
    ]
}
```

## Get Started 🌟
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

## Architecture Pattern

Photogal implements an MVC architectural design pattern with PostgresSQL hosted on AWS as the database (M) storing user information, relational likes and edits information. Express/NodeJS in the backend acts as the controller and routes requests and results/data (C) in both directions to the database(M) and to the views(V). ReactJS as the frontend, constantly rendering the returning information to the viewers (V).

#### UI Design
Photogal begins with either login or sign up component. Design to be simple but artistic, emulating a photographers aesthetic, this component simply has two or three fields to get started. There are minimal buttons and distractions and input fields are clearly labeled with icons and text.
![alt_text](https://user-images.githubusercontent.com/68566126/104473653-33a1f800-558b-11eb-85bc-35550bc3a311.png "Photogal Login")

Once logged in, the user is redirected to the home page where random photos can be viewed. To provide a smooth experience, infinite scroll is enabled. 

![Photogal_home2](https://user-images.githubusercontent.com/68566126/104480001-0dcc2180-5592-11eb-8a3a-28d428706c5d.gif)

A simple search bar placed front and center is to encourange keyword search for images. Each image card clearly annotates the details of the photo, photographer, etc. 
![alt_text](https://user-images.githubusercontent.com/68566126/104474694-4406a280-558c-11eb-8ef1-9f5fd2d27b07.png "Photogal Search and Like")

The edit modal is built to be easy to use. Sliders for each photo quality that can be changed sit right under the photo and changes are realtime in order to provide a seamless experience. The edits can be saved to the users account via PSQL database and be viewed on the edits tab from the main page.

![Photogal_edit2](https://user-images.githubusercontent.com/68566126/104477293-ecb60180-558e-11eb-8352-60f12757b767.gif)


## Future Improvements

A few improvements that would allow the app to run smoother and as expected include but are not limited to:
1. Allowing for downloads of edited images
2. Quicker loading of images (either from a local cache or compressed)
3. Implementing more photo editing options such as crop or rotate
