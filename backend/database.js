import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'product_db',
}).promise();

export async function getProduct(id) {
    const [result] = await pool.query(`
    SELECT * FROM product 
    WHERE id = ?
    `, [id]);
    return result[0]; // returns array of javascript object describing product
}

export async function getAllProduct() {
    const [result] = await pool.query(`
    SELECT * FROM product
    `);
    return result[0];
}

// Input -> invoice model that contains date, customer, salesperson name,
// and optional notes
export async function addInvoice(invoice) {

    const date = invoice.date_added;
    const customerName = invoice.customer_name;
    const salespersonName = invoice.salesperson_name;
    const notes = invoice.notes;

    const result = await pool.query(`
        INSERT INTO invoice (date_added, customer_name, salesperson_name, notes)
        VALUES
        (?, ?, ?, ?)
        `, [date, customerName, salespersonName, notes]);
    const id = result.insertId;
    return getInvoice(id);
}

// One or many products, which includes product_id, and quantity added
export async function addSales(invoice, product) {
    const quantity = product.quantity;
    const productId = product.id;
    const invoiceId = invoice.id;
    // const productPrice = await getProduct(productId).price;
    const fetchedProduct = await getProduct(productId);
    const productPrice = fetchedProduct.price;
    const totalPrice = quantity * productPrice;

    await pool.query(`
        INSERT INTO sales (invoice_id, product_id, quantity, total_price)
        VALUES
        (?, ?, ?, ?)
        `, [invoiceId, productId , quantity, totalPrice]);
}

export async function getInvoice(id) {
    const [result] = await pool.query(`
    SELECT * FROM invoice 
    WHERE id = ?
    `, [id]);
    return result[0]; // returns array of javascript object describing invoice
}

export async function getAllSales() {
    const sales = await pool.query(`
    SELECT * FROM sales
    `);
    return sales[0]; //return array of Javascript object of sales
}