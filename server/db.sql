CREATE DATABASE photogal;

--DROP TABLE IF EXISTS users;
--DROP TABLE IF EXISTS likes;
--DROP TABLE IF EXISTS edits;

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
    image VARCHAR(255) NOT NULL,
    imagelink VARCHAR(400) NOT NULL,
    liker_id uuid REFERENCES users(user_id) NOT NULL
);

CREATE TABLE edits(
    id BIGSERIAL PRIMARY KEY, 
    image VARCHAR(255) NOT NULL,
    imagelink VARCHAR(400) NOT NULL,
    options VARCHAR(2000) NOT NULL,
    editor_id uuid REFERENCES users(user_id) NOT NULL
);

ALTER TABLE likes ADD description VARCHAR(1000);
ALTER TABLE edits ADD description VARCHAR(1000);