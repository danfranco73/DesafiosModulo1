// Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.
// Aspectos a incluir

// Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos.
// Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.

// Aspectos a incluir
// El servidor debe contar con los siguientes endpoints:
// ruta ‘/products’, la cual debe leer el archivo de productos  situado en la carpeta files y se llama products.json y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
// Si no se recibe query de límite, se devolverán todos los productos
// Si se recibe un límite, sólo devolver el número de productos solicitados
// ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos.

// Sugerencias
// Tu clase lee archivos con promesas. recuerda usar async/await en tus endpoints
// Utiliza un archivo que ya tenga productos, pues el desafío sólo es para gets.



// Se corroborará que el servidor esté corriendo en el puerto 8080.
// Se mandará a llamar desde el navegador a la url http://localhost:8080/products sin query, eso debe devolver todos los 10 productos.
// Se mandará a llamar desde el navegador a la url http://localhost:8080/products?limit=5 , eso debe devolver sólo los primeros 5 de los 10 productos.
// Se mandará a llamar desde el navegador a la url http://localhost:8080/products/2, eso debe devolver sólo el producto con id=2.
// Se mandará a llamar desde el navegador a la url http://localhost:8080/products/34123123, al no existir el id del producto, debe devolver un objeto con un error indicando que el producto no existe.

// Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos.
// Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.

const express = require("express");
const app = express();
const ProductManager = require("./ProductManager.js");
const port = 8080;
// instancio la clase ProductManager y le paso el path del archivo de productos que es sku.json en la carpeta files
const productManager = new ProductManager("/sku.json");


app.get("/products", async (req, res) => {
    const products = await productManager.getProducts();
    if (req.query.limit) {
        const limit = req.query.limit;
        const limitedProducts = products.slice(0, limit);
        res.json(limitedProducts);
    } else {
        res.json(products);
    }
    });

app.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    const product = await productManager.getProductById(id);
    res.json(product);
    }
);

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    }
);

server.on("error", (error) => {
    console.log(`Error: ${error}`);
    }
);

