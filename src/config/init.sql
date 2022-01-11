CREATE DATABASE sql_festivals WITH OWNER = aimericsorin;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SET TIMEZONE = 'GMT';

-- column role in user with foreign key to roles table
CREATE TABLE ROLES
(
    id   UUID UNIQUE        NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO ROLES(name)
VALUES ('ADMIN');
INSERT INTO ROLES(name)
VALUES ('BASIC');

CREATE TABLE USERS
(
    id         UUID UNIQUE        NOT NULL DEFAULT uuid_generate_v4(),
    username   VARCHAR(50) UNIQUE NOT NULL,
    password   VARCHAR(100)       NOT NULL,
    email      VARCHAR(50) UNIQUE NOT NULL,
    role       UUID               NOT NULL,
    created_on timestamp                   DEFAULT now(),
    PRIMARY KEY (id),
    FOREIGN KEY (role) REFERENCES ROLES (id)
);

CREATE TABLE ARTISTS
(
    id           UUID               NOT NULL DEFAULT uuid_generate_v4(),
    name         VARCHAR(50) UNIQUE NOT NULL,
    nationality  VARCHAR(50)        NOT NULL,
    music_styles VARCHAR(100)       NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE EVENTS
(
    id           UUID               NOT NULL DEFAULT uuid_generate_v4(),
    name         VARCHAR(50) UNIQUE NOT NULL,
    location     VARCHAR(100)       NOT NULL,
    started_date timestamp          NOT NULL,
    finish_date  timestamp          NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE FOLLOW_EVENT
(
    user_id  UUID NOT NULL,
    event_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES USERS (id),
    FOREIGN KEY (event_id) REFERENCES EVENTS (id),
    PRIMARY KEY (user_id, event_id)
);

CREATE TABLE FOLLOW_ARTIST
(
    user_id   UUID NOT NULL,
    artist_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES USERS (id),
    FOREIGN KEY (artist_id) REFERENCES ARTISTS (id),
    PRIMARY KEY (user_id, artist_id)
);

CREATE TABLE PERFORMING_EVENT
(
    artist_id UUID NOT NULL,
    event_id  UUID NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES ARTISTS (id),
    FOREIGN KEY (event_id) REFERENCES EVENTS (id),
    PRIMARY KEY (artist_id, event_id)
);

CREATE TABLE REFRESH_TOKEN
(
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    token_value VARCHAR(500) NOT NULL,
    PRIMARY KEY (id)
);