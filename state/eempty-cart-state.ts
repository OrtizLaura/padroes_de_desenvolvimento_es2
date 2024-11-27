import { ECommerceProductProtocol } from "./eecommerce-productprotocol";
import { ShoppingCartState } from "./sshopping-cart-state";
import { ECommerceShoppingCart } from "./eecommerce-shopping-cart";
import { WithProductsState } from "./wwith-products-state";

export class EmptyCartState implements ShoppingCartState {
    constructor(private cart: ECommerceShoppingCart) {}

    addProduct(product: ECommerceProductProtocol): void {
        this.cart.getProducts().push(product);
        this.cart.setState(new WithProductsState(this.cart));
        console.log(`Produto "${product.name}" adicionado ao carrinho.`);
    }

    removeProduct(): void {
        console.log('Carrinho vazio. Nenhum produto para remover.');
    }

    checkout(): void {
        console.log('Carrinho vazio. Adicione produtos antes de finalizar a compra.');
    }
}