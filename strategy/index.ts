import { ECommerceShoppingCart } from "./shopping-cart/ecommerce-shopping-cart";
import { DefaultDiscount } from "./shopping-cart/default-discount";
import { NewDiscount } from "./shopping-cart/new-discount";

const shoppingCart = new ECommerceShoppingCart();

shoppingCart.discount = new DefaultDiscount();
shoppingCart.discount = new NewDiscount();

shoppingCart.addProduct({name: 'Produto 1', price: 50});
shoppingCart.addProduct({name: 'Produto 2', price: 50});
shoppingCart.addProduct({name: 'Produto 3', price: 50});
shoppingCart.addProduct({name: 'Produto 4', price: 50});
shoppingCart.addProduct({name: 'Produto 5', price: 50});
shoppingCart.addProduct({name: 'Produto 6', price: 50});
console.log(shoppingCart.getTotal());
console.log(shoppingCart.getTotalWithDiscount())