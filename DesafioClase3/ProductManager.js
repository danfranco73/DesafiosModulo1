// Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos (basado en entregable 1).
// Aspectos a incluir:
//* La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.
//* Debe guardar objetos con el siguiente formato:
//. id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
//. title (nombre del producto)
//. description (descripción del producto)
//. price (precio)
//. thumbnail (ruta de imagen)
//. code (código identificador)
//. stock (número de piezas disponibles)

//Aspectos a incluir

//Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).
//Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
//Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto
//Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID
//Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      throw new Error("Todos los campos son obligatorios");
    }
    if (this.products.some((prod) => prod.code === product.code)) {
      throw new Error("Codigo ya existente en productos");
    }
    product.id = this.products.length + 1;
    this.products.push(product);
    this.save();
    return product;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  updateProduct(id, product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      throw new Error("Todos los campos son obligatorios");
    }
    if (
      this.products.some((prod) => prod.code === product.code && prod.id !== id)
    ) {
      throw new Error("Codigo ya existente en productos");
    }
    const index = this.products.findIndex((prod) => prod.id === id);
    if (index === -1) {
      throw new Error("Producto no encontrado");
    }
    this.products[index] = product;
    this.save();
    return product;
  }

  deleteProduct(id) {
    const index = this.products.findIndex((prod) => prod.id === id);
    if (index === -1) {
      throw new Error("Producto no encontrado");
    }
    this.products.splice(index, 1);
    this.save();
  }

  save() {
    const fs = require("fs");

    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));

    return true;
  }
}

module.exports = ProductManager;

// Testing

const productManager = new ProductManager("./productos.txt");

console.log(productManager.getProducts());

const product = productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});

console.log(productManager.getProducts());

try {
  productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });
} catch (error) {
  console.log(error.message);
}

try {
  productManager.updateProduct(1, {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });
} catch (error) {
  console.log(error.message);
}

try {
  productManager.updateProduct(2, {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });
} catch (error) {
  console.log(error.message);
}

console.log(productManager.getProducts());

try {
  productManager.deleteProduct(1);
} catch (error) {
  console.log(error.message);
}

try {
  productManager.deleteProduct(2);
} catch (error) {
  console.log(error.message);
}

console.log(productManager.getProducts());

try {
  productManager.getProductById(1);
} catch (error) {
  console.log(error.message);
}

try {
  productManager.getProductById(2);
} catch (error) {
  console.log(error.message);
}

console.log(productManager.getProducts());
