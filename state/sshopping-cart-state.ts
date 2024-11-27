import { ECommerceProductProtocol } from "./eecommerce-productprotocol";

export interface ShoppingCartState {
    addProduct(product: ECommerceProductProtocol): void;
    removeProduct(product: ECommerceProductProtocol): void;
    checkout(): void;
}