DROP database studentverken;
CREATE database studentverken;

USE studentverken;

DROP TABLE IF EXISTS users;
USE studentverken;
CREATE TABLE users
(
	id INT auto_increment PRIMARY KEY,
    username varchar(30) not null,
    `password` varchar(30) not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
	op5_key varchar(30)
);