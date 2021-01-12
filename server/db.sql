CREATE DATABASE photogal;

--DROP TABLE IF EXISTS users;
--DROP TABLE IF EXISTS likes;

--set extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

INSERT INTO users (user_name, user_email, user_password) VALUES ('demo', 'de@mo.com', 'password');

CREATE TABLE likes(
    id BIGSERIAL PRIMARY KEY,
    image VARCHAR(255),
    liker_id uuid REFERENCES users(user_id) NOT NULL
);