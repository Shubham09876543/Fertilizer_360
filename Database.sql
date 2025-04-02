-- Create the database
CREATE DATABASE Fertilizer360;

-- Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin', 'shopkeeper') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
