-- mysql -u root < <このファイル>
CREATE DATABASE schedule_development CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'schedule_development'@'localhost' IDENTIFIED BY 'password';
GRANT CREATE, SELECT, INSERT, UPDATE, DELETE ON schedule_development.* TO 'schedule_development'@'localhost';