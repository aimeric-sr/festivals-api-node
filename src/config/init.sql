CREATE DATABASE test WITH OWNER = aimericsorin;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- column role in user with foreign key to roles table
CREATE TABLE USERS(
    id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    created_on timestamp with time zone DEFAULT now(),
    PRIMARY KEY (id)
);

CREATE TABLE ARTISTS(
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    nationality VARCHAR(50) NOT NULL,
    music_styles VARCHAR(100) NOT NULL,
    user_id uuid NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES USERS (id)
);

CREATE TABLE EVENTS(
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    location VARCHAR(100) NOT NULL,
    started_date timestamp with time zone NOT NULL,
    finish_date timestamp with time zone NOT NULL,
    user_id uuid NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES USERS (id)
);