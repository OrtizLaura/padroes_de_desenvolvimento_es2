import { ECommerceProductProtocol } from "./eecommerce-productprotocol";
import { ShoppingCartState } from "./sshopping-cart-state";
import { EmptyCartState } from "./eempty-cart-state";

export class ECommerceShoppingCart {
    private products: ECommerceProductProtocol[] = [];
    private state: ShoppingCartState = new EmptyCartState(this);

    setState(state: ShoppingCartState): void {
        this.state = state;
    }

    getProducts(): ECommerceProductProtocol[] {
        return this.products;
    }

    addProduct(product: ECommerceProductProtocol): void {
        this.state.addProduct(product);
    }

    removeProduct(product: ECommerceProductProtocol): void {
        this.state.removeProduct(product);
    }

    checkout(): void {
        this.state.checkout();
    }

    getTotal(): number {
        return this.products.reduce((sum, product) => sum + product.price, 0);
    }
}