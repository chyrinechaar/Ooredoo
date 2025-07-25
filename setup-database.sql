-- Create database for employee management system
CREATE DATABASE IF NOT EXISTS employee_management;

-- Use the database
USE employee_management;

-- Create user (optional - you can use root)
-- CREATE USER 'employee_user'@'localhost' IDENTIFIED BY 'your_password';
-- GRANT ALL PRIVILEGES ON employee_management.* TO 'employee_user'@'localhost';
-- FLUSH PRIVILEGES;

-- The employees table will be created automatically by Spring Boot JPA
-- But here's the structure for reference:

/*
CREATE TABLE employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    departement VARCHAR(255) NOT NULL,
    badge VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/

-- Show all tables after Spring Boot creates them
SHOW TABLES;