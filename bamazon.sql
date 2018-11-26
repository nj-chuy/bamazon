DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(40) NULL,
  department_name VARCHAR(35) NULL,
  price DECIMAL(10,2) NULL,
  quantity INTEGER(10),
  PRIMARY KEY (id)
);


select * from products;
