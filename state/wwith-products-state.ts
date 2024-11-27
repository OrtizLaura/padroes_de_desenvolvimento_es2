import { ECommerceProductProtocol } from "./eecommerce-productprotocol";
import { ShoppingCartState } from "./sshopping-cart-state";
import { ECommerceShoppingCart } from "./eecommerce-shopping-cart";
import { EmptyCartState } from "./eempty-cart-state";
import { ClosedCartState } from "./cclosed-cart-state";

export class WithProductsState implements ShoppingCartState {
    constructor(private cart: ECommerceShoppingCart) {}

    addProduct(product: ECommerceProductProtocol): void {
        this.cart.getProducts().push(product);
        console.log(`Produto "${product.name}" adicionado ao carrinho.`);
    }

    removeProduct(product: ECommerceProductProtocol): void {
        const index = this.cart.getProducts().indexOf(product);
        if (index > -1) {
            this.cart.getProducts().splice(index, 1);
            console.log(`Produto "${product.name}" removido do carrinho.`);
            if (this.cart.getProducts().length === 0) {
                this.cart.setState(new EmptyCartState(this.cart));
            }
        }
    }

    checkout(): void {
        console.log('Finalizando compra...');
        this.cart.setState(new ClosedCartState(this.cart));
    }
}