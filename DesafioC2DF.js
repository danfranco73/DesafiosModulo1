class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Todos los campos son obligatorios");
    }
    if (this.products.some((product) => product.code === code)) {
      throw new Error("Codigo ya existente en productos");
    }
    const product = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(product);
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
}

const productManager = new ProductManager();

console.log(productManager.getProducts());

const product = productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log(productManager.getProducts());

try {
  productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
} catch (error) {
  console.log(error.message);
}

const product2 = productManager.addProduct(
  "producto prueba 2",
  "Este es un producto prueba 2",
  200,
  "Sin imagen",
  "abc124",
  25
);

console.log(productManager.getProducts());

try {
  console.log(productManager.getProductById(2));
} catch (error) {
  console.log("Id no encontrado");
}

try {
  console.log(productManager.getProductById(3));
} catch (error) {
  console.log("Id no encontrado");
}
