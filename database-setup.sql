-- Employee Management Database Setup Script
-- Run this script in MySQL to create the database

-- Create database
CREATE DATABASE IF NOT EXISTS employee_management;

-- Use the database
USE employee_management;

-- The employees table will be automatically created by Hibernate
-- based on the Entity class, but here's the expected structure:

/*
CREATE TABLE IF NOT EXISTS employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    departement VARCHAR(255) NOT NULL,
    badge VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_badge (badge)
);
*/

-- Optional: Create a user for the application (recommended for production)
-- CREATE USER 'employee_app'@'localhost' IDENTIFIED BY 'your_secure_password';
-- GRANT ALL PRIVILEGES ON employee_management.* TO 'employee_app'@'localhost';
-- FLUSH PRIVILEGES;