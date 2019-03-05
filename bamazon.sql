drop database if exists bamazonDB;

create database bamazonDB;

use bamazonDB;

create table products(
	ID INTEGER auto_increment not null,
    product_name varchar(30) not null,
    department_name varchar(30) not null,
    price decimal (10,2) not null,
    stock_quantity int not null,
    primary key (ID)
);

