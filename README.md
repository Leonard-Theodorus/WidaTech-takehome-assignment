# WidaTech-takehome-assignment
This repository serves as an attempt to create a system as a part of widatech's takehome assignment.

Throughout the time alloted, I only did manage to create the backend service of the web application, as for the assignment, we were tasked to create a feature of a point of sales system, in which the user can create invoices and sales data, then save it into the database.

As for the database, we were tasked to use relational database and I ended up using MySQL, as can be seen in the schema.sql file in which in there lies the database schema design.

Them from there, I connected the database with backend services using express JS and node JS.

For the database design, the requirements provided are pretty straightforward, hence the creation of invoice and product table can be directly copied from the case requirements.
From the case we knew that each of the invoice data can contains multiple products that are sold in that invoice. This means there will be a many to many relationship in the database between invoice and product table, which is prohibited because we can't exactly tell which products are in an invoice. Hence the decision to create a third table in the database called sales that resolves many to many relationships between the product and invoice table.
