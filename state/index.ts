import { ECommerceShoppingCart } from "./eecommerce-shopping-cart";


const shoppingCart = new ECommerceShoppingCart();


shoppingCart.addProduct({ name: 'Produto 1', price: 50 });
shoppingCart.addProduct({ name: 'Produto 2', price: 100 });


shoppingCart.removeProduct({ name: 'Produto 1', price: 50 });


shoppingCart.checkout();


shoppingCart.addProduct({ name: 'Produto 3', price: 150 });
