import express from "express";
import { getAllProduct, addInvoice, addSales, getAllSales} from "../database.js";

const app = express();
app.use(express.json());
app.listen(8080, () => {
    console.log("Server running on port 8080");
})

app.get("/product", async (req, res) => {
    // Get all products, use it to cache product search
    // Will be used in creating product suggestions as the user types in frontend
    const products = await getAllProduct();
    res.send(products);
});

app.post("/invoice", async (req, res) => {
    // Adding new invoice
    console.log(req.body);
    const invoice = req.body; // invoice object will be in JSON format
    const newInvoice = await addInvoice(invoice);
    res.status(201).send(invoice);
});

app.post("/sales", async (req, res) => {
    const sales = req.body; //Body will contain invoice and product data in JSON format
    const invoice = sales.invoice;
    //Invoice JSON will contain invoice id to be inserted
    const product = sales.product;
    // Product's JSON will contain product id to be inserted and it's quantity
    await addSales(invoice, product);
    res.status(201).send("Sales succesfully added!");
});

app.get("/sales", async (req, res) => {
    // Getting sales (invoices) with pagination
    const allSales = await getAllSales();
    const pageLimit = Math.ceil(allSales.length / 5); // The last page where there is no empty item
    // asuuming 5 invoices per page
    let page = parseInt(req.query.p); // Page in the HTTP request's query using the word p
    if (!page) {page = 1}; //If query is not provided in the request, default to first page
    if (page > pageLimit) {page = pageLimit}; // if requested page is more than page limit, default to the last page
    
    res.json({
        "page" : page,
        "pageLimit" : pageLimit,
        "sales" : allSales.slice(page * 5 - 5, page * 5) // assuming one page consist of 5 invoice items
    })
});