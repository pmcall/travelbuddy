DROP TABLE IF EXISTS user CASCADE;

CREATE TABLE user (
  user_id SERIAL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  sub_id VARCHAR(255) NOT NULL,
  home VARCHAR(255) NOT NULL
);