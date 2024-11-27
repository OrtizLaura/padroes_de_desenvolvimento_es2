import { ShoppingCartState } from "./sshopping-cart-state";
import { ECommerceShoppingCart } from "./eecommerce-shopping-cart";

export class ClosedCartState implements ShoppingCartState {
    constructor(private cart: ECommerceShoppingCart) {}

    addProduct(): void {
        console.log('Compra finalizada. Não é possível adicionar mais produtos.');
    }

    removeProduct(): void {
        console.log('Compra finalizada. Não é possível remover produtos.');
    }

    checkout(): void {
        console.log('Compra já foi finalizada.');
    }
}