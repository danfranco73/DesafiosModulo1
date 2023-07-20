const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
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
    // Agregamos el id al producto que no cambia nunca y es unico (controlo que no exista ya al haberse eliminado un id) y lo agregamos al array y se lo pasamos al metodo save y se guarda en el archivo y se retorna el producto siempre con el id
    product.id = this.products.length + 1;
    while (this.products.some((prod) => prod.id === product.id)) {
      product.id = uuidv4();
    }
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
      try {
        throw new Error("Producto no encontrado");
      } catch (error) {
        console.log(error.message);
      }
      return product;
    }
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
    if (this.products.some((prod) => prod.code === product.code)) {
      throw new Error("Codigo ya existente en productos");
    }
    const index = this.products.findIndex((prod) => prod.id === id);
    if (index === -1) {
      throw new Error("Producto no encontrado");
    }
    this.products[index] = { ...product, id };
    this.save();
    return this.products[index];
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
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));

    return true;
  }
}

module.exports = ProductManager;