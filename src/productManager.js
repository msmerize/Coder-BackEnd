import fs from 'fs';

class ProductManager {
    constructor() {
        this.products = ['products']
        this.path = "./database/productos.json"
    }

    appendProduct = async () => {
        const toJSON = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, toJSON)
    };

    addProducts = (title, description, price, thumbnail, code, stock) => {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        
        /* ID Auto-Incrementable */

        if (this.products.length === 0) {
            product.id = 1 
        } else product.id = this.products [this.products.length - 1].id + 1
    }


    addProduct(newProduct){

        /* Validations */
        if (!newProduct.title || 
            !newProduct.description || 
            !newProduct.price || 
            !newProduct.thumbnail || 
            !newProduct.code || 
            !newProduct.stock) return `Debe rellenar todos los campos`

            let product = this.products.find(prod => prod.code === newProduct.code)
            if (product) return `Ya existe un producto con este codigo`

        return this.products.push({id: this.products.length+1, ...newProduct}) &&
        this.appendProduct()
    }

    getProducts = async () => {
        try {
        const productosDb = await fs.promises.readFile(this.path, "utf-8");
        console.log(productosDb);
        } catch (err) {
        console.log(err);
        }
    };

    getProductById = async (idProduct) => {
        try {
        const productosDb = await fs.promises.readFile(this.path, "utf-8");
        const productoId = JSON.parse(productosDb);
        const find = productoId.find((value) => value.id === idProduct);
        return console.log(
            find ? find : "No se encontró un producto con el ID recibido"
        );
        } catch (err) {
        console.log(err);
        }
    };

updateProduct = async (id, obj) => {
    try {
    const productosDb = await fs.promises.readFile(this.path, "utf-8");
    const productoId = JSON.parse(productosDb);

    const productoUpdt = Object.assign(productoId[id - 1], obj);
    console.log(productoUpdt);
    this.products = productoId;
    this.appendProduct();
    } catch (err) {
    console.log(err);
    }
};

deleteProduct = async (id) => {
    try {
    const productosDb = await fs.promises.readFile(this.path, "utf-8");
    const productoId = JSON.parse(productosDb);

    productoId.splice(id - 1, 1);
    this.products = productoId;
    this.appendProduct();
    } catch (err) {
    console.log(err);
    }
};

}

const product = new ProductManager ()

product.getProductById(2)