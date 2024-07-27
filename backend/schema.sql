CREATE DATABASE product_db;
USE product_db;

CREATE TABLE product (
    id integer AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    picture text NOT NULL,
    stock integer NOT NULL,
    price double NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE invoice (
    id integer NOT NULL AUTO_INCREMENT,
    date_added date NOT NULL,
    customer_name varchar(255) NOT NULL,
    salesperson_name varchar(255) NOT NULL,
    notes text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE sales (
    invoice_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    total_price double NOT NULL,
    PRIMARY KEY (invoice_id, product_id),
    FOREIGN KEY (invoice_id) REFERENCES invoice(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

INSERT INTO product (name, picture, stock, price)
VALUES
("Mug", 
"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.similarpng.com%2Fvery-thumbnail%2F2020%2F08%2FWhite-Mug-on-transparent-background-PNG.png&f=1&nofb=1&ipt=2c5a7886067e3f8bd81900a86fbbd4f1b2509bc59889bc4a563742ac3cb6d71c&ipo=images", 
15, 15000),
("Plate", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.vhv.rs%2Fdpng%2Fd%2F479-4799586_plates-png-photo-images-free-download-plate-png.png&f=1&nofb=1&ipt=15b50554bca7924f18c317da63fc731f156165930777773fe36e662236d8915e&ipo=images",
 10, 12000),
("Spoon", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoppng.com%2Fuploads%2Fpreview%2Fwooden-spoon-transparent-png-wooden-spoon-transparent-background-11563013238ssjqrmrm0z.png&f=1&nofb=1&ipt=194fac0ec320acb057ca775558a44c59cac45a5b89723947e60237cc7b3a910a&ipo=images", 
20, 8000),
("Fork", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpng.pngtree.com%2Fpng-clipart%2F20201209%2Foriginal%2Fpngtree-fork-png-image_5634883.jpg&f=1&nofb=1&ipt=07e7e75d097a7ccb7f86b8dc21ea5b0a852c241f6ad488e2655245ba722e64da&ipo=images", 
14, 8000);

INSERT INTO invoice (date_added, customer_name, salesperson_name, notes)
VALUES
("2024-07-26", "John", "Doe", "Invoice 26 July 2024"),
("2024-07-25", "Frank", "Sinatra", "Invoice 25 July 2024"),
("2024-07-24", "Jeff", "Pete", "Invoice 24 July 2024");

INSERT INTO sales (invoice_id, product_id, quantity, total_price)
VALUES
(1, 1, 2, 30000),
(1, 2, 3, 36000),
(2, 3, 1, 8000),
(2, 4, 1, 8000),
(3, 3, 2, 16000),
(3, 4, 2, 16000);