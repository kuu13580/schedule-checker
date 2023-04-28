-- mysql -u root < <このファイル>
DROP DATABASE IF EXISTS schedule_development;
CREATE DATABASE schedule_development CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
DROP USER IF EXISTS 'schedule_development'@'localhost';
CREATE USER 'schedule_development'@'localhost' IDENTIFIED BY 'password';
GRANT ALL ON schedule_development.* TO 'schedule_development'@'localhost';