import { v4 as newId } from 'uuid';

const products = [
    {
        id: newId(),
        name: 'Canon Camera',
        price: '230',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwKXrExPBPZJsGMVp3X_TMALZwC41G-qZvcQ&usqp=CAU'
    },
    {
        id: newId(),
        name: 'Jackets',
        price: '100',
        url: 'https://www.webbikeworld.com/wp-content/uploads/2014/09/Fakes.jpg'
    },
    {
        id: newId(),
        name: 'T-shirt',
        price: '30',
        url: 'https://assets.bigcartel.com/product_images/365728606/jerk+store.png?auto=format&fit=max&h=600&w=600'
    }
];

class Product {
    constructor(name, price, url) {
        this.id = newId();
        this.name = name;
        this.price = price;
        this.url = url;
    }

    // methods
    static getProducts = () => {
        return products;
    };

    addProduct = () => {
        products.push(this);
    };
}

export default Product;
