DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR NOT NULL,
    last VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    image VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

 -- DROP TABLE IF EXISTS files;

-- CREATE TABLE files(
--     id SERIAL PRIMARY KEY,
--     url VARCHAR(300) NOT NULL,
--     username VARCHAR(255) NOT NULL CHECK (username !=''),
--     title VARCHAR(255) NOT NULL CHECK (title !=''),
--     description TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

DROP TABLE IF EXISTS plots;

CREATE TABLE plots(
    id SERIAL PRIMARY KEY,
    ra FLOAT,
    dec FLOAT,
    name VARCHAR(255) NOT NULL,
    file VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS chats;

CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    user_message_id INT REFERENCES users(id),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
