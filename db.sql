CREATE DATABASE IF NOT EXISTS memory_game;
USE memory_game;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  score INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
