-- --to run this file and update your local db run: psql -f users.sql
DROP TABLE IF EXISTS teaching;
DROP TABLE IF EXISTS learning;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS instantSessionRequests CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS sessionsToUsers CASCADE;


CREATE TABLE teachers (
  ID SERIAL PRIMARY KEY,
  isAvailable BOOLEAN,
  favorite BOOLEAN,
  rating REAL,
  ratingCount INT DEFAULT 0
  rating INT,
  rate INT

);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  authID TEXT,
  username VARCHAR,
  name VARCHAR,
  email VARCHAR,
  teacherID integer references teachers(id) ON DELETE CASCADE,
  teacher BOOLEAN
);

CREATE TABLE subjects (
  ID SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE sessions (
  ID SERIAL PRIMARY KEY,
  studentID integer references users(id) ON DELETE CASCADE, 
  teacherID integer references users(id) ON DELETE CASCADE, 
  start TIMESTAMP,
  ending TIMESTAMP,
  confirmed BOOLEAN,
  subjectID INT references subjects(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
  ID SERIAL PRIMARY KEY,
  teacherAuthID text,
  studentAuthID text,
  review text,
  rating INT
);

CREATE TABLE instantSessionRequests (
  ID SERIAL PRIMARY KEY,
  studentAuthID text,
  teacherAuthID text,
  subjectID INT references subjects(id) ON DELETE CASCADE
);

CREATE TABLE learning (
  userID INT references users(id) ON DELETE CASCADE,
  subjectID INT references subjects(id) ON DELETE CASCADE,
  progress INT default 0
);

CREATE TABLE teaching (
  userID INT references users(id) ON DELETE CASCADE,
  subjectID INT references subjects(id) ON DELETE CASCADE
);

INSERT INTO teachers (isAvailable, favorite, rating)
  VALUES (true, false, 1);

INSERT INTO teachers (isAvailable, favorite, rating)
  VALUES (true, false, 2);

INSERT INTO teachers (isAvailable, favorite, rating)
  VALUES (true, false, 3);

INSERT INTO teachers (isAvailable, favorite, rating)
  VALUES (true, false, 4);

INSERT INTO teachers (isAvailable, favorite, rating)
  VALUES (true, false, 5);

INSERT INTO teachers (isAvailable, favorite, rating)
  VALUES (true, false, 5);

INSERT INTO users (email, authid, username, name, teacher, teacherID)
  VALUES ('hbp@hogwarts.com', 'auth0|57b686db71f98d48132d9aad', 'halfbloodprince', 'Severus Snape', true, 1);

INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('hp@hogwarts.com', 'auth0|57b27e4e51f9235564a6f68b', 'chosen one', 'Harry Potter', false);

INSERT INTO users (email, authid, username, name, teacher, teacherID)
  VALUES ('hagrid@gmail.com', 'auth0|57b27e8a71c16ce874b94fd0', 'Hagrid', 'Hagrid', true, 2);

INSERT INTO users (email, authid, username, name, teacher, teacherID)
  VALUES ('mmoody', 'auth0|57b27f3971c16ce874b94fd6', 'crazyeyes', 'Mad-Eye Moody', true, 3);

INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('rweasly@yahoo.com', 'auth0|57b27fa071c16ce874b94fd8auth4', 'Ronald', 'Ron', false);

INSERT INTO users (email, authid, username, name, teacher, teacherID)
  VALUES ('vmor@hotmail.com', 'auth0|57b27fd771c16ce874b94fda', 'Tom', 'Voldemort', true, 4);

INSERT INTO users (email, authid, username, name, teacher, teacherID)
  VALUES ('ddore@gmail.com', 'auth0|57b2801371c16ce874b94fdd', 'Headmaster', 'Dumbledore', true, 5);

INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('deathwatcher@crazy.com', 'auth0|57b2805971c16ce874b94fe0', 'crazy person', 'Luna Lovegood', false);

INSERT INTO users (email, authid, username, name, teacher, teacherID)
  VALUES ('e@e.com', 'auth0|57b2818451f9235564a6f698', 'halfbloodprince', 'Severus Snape', true, 6);
  
INSERT INTO users (email, authid, username, name, teacher)
  VALUES ('q@q.com', 'auth0|57b2817951f9235564a6f697', 'chosen one', 'Harry Potter', false);


INSERT INTO subjects (name)
  VALUES ('Potions');

INSERT INTO subjects (name)
  VALUES ('Defense against the dark arts');

INSERT INTO subjects (name)
  VALUES ('Care of Magical Creatures');

INSERT INTO subjects (name)
  VALUES ('Taco Making');

INSERT INTO subjects (name)
  VALUES ('Dueling');

INSERT INTO teaching (userID, subjectID)
  VALUES (1, 1);

INSERT INTO teaching (userID, subjectID)
  VALUES (1, 2);

INSERT INTO teaching (userID, subjectID)
  VALUES (1, 3);

INSERT INTO learning (userID, subjectID)
  VALUES (2, 1);

INSERT INTO teaching (userID, subjectID)
  VALUES (7, 4);

INSERT INTO teaching (userID, subjectID)
  VALUES (7, 5);

INSERT INTO instantSessionRequests (studentAuthID, teacherAuthID, subjectID)
  VALUES ('auth0|57b27e4e51f9235564a6f68b', 'auth0|57b27ddd71c16ce874b94fcb', 1);

INSERT INTO instantSessionRequests (studentAuthID, teacherAuthID, subjectID)
  VALUES ('auth0|57b27e4e51f9235564a6f68b', 'auth0|57b27e8a71c16ce874b94fd0', 3);
