# Padrões de Desenvolvimento

Padrões de desenvolvimento são soluções genéricas e reutilizáveis para problemas comuns no design de software. Eles ajudam a criar código mais modular, flexível e de fácil manutenção.

## Padrão Strategy

O padrão Strategy é um dos padrões comportamentais mais úteis. Ele permite encapsular algoritmos em classes separadas, tornando-os intercambiáveis sem alterar o comportamento do sistema principal.


## Código Sem o Padrão Strategy

No código abaixo, a classe ECommerceShoppingCart contém lógica de desconto acoplada diretamente à classe DiscountStrategy e suas subclasses.

``` js
export interface ECommerceProductProtocol {
    name: string;
    price: number;
}

export class ECommerceShoppingCart {
    private products: ECommerceProductProtocol[] = [];
    private  _discountStrategy: DiscountStrategy = new DiscountStrategy();

    addProduct(... products: ECommerceProductProtocol[]): void{
        products.forEach((product) => this.products.push(product));

    }

    getProducts(): ECommerceProductProtocol[] {
        return this.products;
    }

    getTotal(): number {
        return this.products.reduce((sum, product) => sum + product.price, 0);
    }

    getTotalWithDiscount(): number {
    
        return this._discountStrategy.getDiscount(this);
    }

    set discount(discount: DiscountStrategy) {
        this._discountStrategy = discount;
    }
 }

export class DiscountStrategy {
    protected discount = 0;

    getDiscount(cart: ECommerceShoppingCart): number {
        return cart.getTotal();
    }
 }

 export class DefaultDiscount extends DiscountStrategy {
    protected discount = 0;

    getDiscount(cart: ECommerceShoppingCart): number {
        const total = cart.getTotal();
        if (total >= 100 && total < 200) {
            this.discount = 10;            
        } else if (total >= 200 && total < 300) {
            this.discount = 20;
        } else if (total >= 300){
            this.discount = 30;
        }
        return total - total * (this.discount / 100);
    }
 }

 export class NewDiscount extends DiscountStrategy {
    protected discount = 0;
    getDiscount(cart: ECommerceShoppingCart): number {
        const total = cart.getTotal();

        if (total >= 150){
            this.discount = 5;
        }

        return total - total * (this.discount / 100);
    }
 }

const shoppingCart = new ECommerceShoppingCart();

shoppingCart.discount = new DefaultDiscount();

shoppingCart.addProduct({name: 'Produto 1', price: 50});
shoppingCart.addProduct({name: 'Produto 2', price: 50});
shoppingCart.addProduct({name: 'Produto 3', price: 50});
shoppingCart.addProduct({name: 'Produto 4', price: 50});
shoppingCart.addProduct({name: 'Produto 5', price: 50});
shoppingCart.addProduct({name: 'Produto 6', price: 50});
console.log(shoppingCart.getTotal());
console.log(shoppingCart.getTotalWithDiscount())

```
## Problemas do Código Sem Strategy

1. Baixa Flexibilidade:
Adicionar uma nova lógica de desconto exige modificar a classe principal ou criar subclasses acopladas.

2. Violação do Princípio de Aberto/Fechado:
A classe ECommerceShoppingCart não está fechada para modificações, já que mudanças na estratégia de desconto requerem alterações nela.

3. Dificuldade de Reutilização:
As lógicas de desconto não podem ser reutilizadas facilmente fora desse contexto.

4. Código Acoplado:
A lógica de cálculo de desconto está diretamente  ligada à estrutura do carrinho.


## Código com Padrão Strategy

Com o padrão Strategy, a lógica de cálculo de desconto é encapsulada em classes independentes e injetada inamicamente na classe principal.

### classe ECommerceProductProtocol
``` js

export interface ECommerceProductProtocol {
    name: string;
    price: number;
}
```

### classe DiscountStrategy

``` js
import { ECommerceShoppingCart } from "./ecommerce-shopping-cart";

export class DiscountStrategy {
    protected discount = 0;

    getDiscount(cart: ECommerceShoppingCart): number {
        return cart.getTotal();
    }
 }

 ```

 ### classe ECommerce ShoppingCart

``` js

import { ECommerceProductProtocol } from "./ecommerce-product-protocol";
import { DiscountStrategy } from "./discount-strategy";

export class ECommerceShoppingCart {
    private products: ECommerceProductProtocol[] = [];
    private  _discountStrategy: DiscountStrategy = new DiscountStrategy();

    addProduct(... products: ECommerceProductProtocol[]): void{
        products.forEach((product) => this.products.push(product));

    }

    getProducts(): ECommerceProductProtocol[] {
        return this.products;
    }

    getTotal(): number {
        return this.products.reduce((sum, product) => sum + product.price, 0);
    }

    getTotalWithDiscount(): number {
    
        return this._discountStrategy.getDiscount(this);
    }

    set discount(discount: DiscountStrategy) {
        this._discountStrategy = discount;
    }
 }

 ```

 ### classe DefaultDiscount

 ```js
 import { ECommerceShoppingCart } from "./ecommerce-shopping-cart";
import { DiscountStrategy } from "./discount-strategy";

export class DefaultDiscount extends DiscountStrategy {
    protected discount = 0;

    getDiscount(cart: ECommerceShoppingCart): number {
        const total = cart.getTotal();
        if (total >= 100 && total < 200) {
            this.discount = 10;            
        } else if (total >= 200 && total < 300) {
            this.discount = 20;
        } else if (total >= 300){
            this.discount = 30;
        }
        return total - total * (this.discount / 100);
    }
 }


 ```
### classe NewDiscount

 ```js
 import { DiscountStrategy } from "./discount-strategy";
import { ECommerceShoppingCart } from "./ecommerce-shopping-cart";

export class NewDiscount extends DiscountStrategy {
    protected discount = 0;
    getDiscount(cart: ECommerceShoppingCart): number {
        const total = cart.getTotal();

        if (total >= 150){
            this.discount = 5;
        }

        return total - total * (this.discount / 100);
    }
 }

 ```

### Index

 ```js
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

```

## Por que o Strategy é Melhor?

 1. Alta Flexibilidade:
 Mudanças na lógica de desconto são feitas em classes separadas, sem alterar a estrutura do carrinho.

 2. Respeito ao Princípio Aberto/Fechado:
Novas estratégias de desconto podem ser adicionadas sem modificar a classe principal.

3. Reutilização de Código:
As estratégias de desconto podem ser aplicadas em outros contextos.

4. Facilidade de Teste:
Cada estratégia é isolada, tornando os testes mais simples.

5. Baixo Acoplamento:
A classe principal (ECommerceShoppingCart) não contém lógica de desconto, apenas delega a tarefa à estratégia injetada.

# Padrão State

O padrão State é um dos padrões comportamentais que permite que um objeto altere seu comportamento com base no estado interno, sem modificar sua classe principal.

## Código Sem o Padrão State
Neste exemplo, o carrinho de compras (ECommerceShoppingCart) gerencia o estado diretamente e altera seu comportamento com base em condições explícitas no código.


``` js
export interface ECommerceProductProtocol {
    name: string;
    price: number;
}

export class ECommerceShoppingCart {
    private products: ECommerceProductProtocol[] = [];
    private  _discountStrategy: DiscountStrategy = new DiscountStrategy();

    addProduct(... products: ECommerceProductProtocol[]): void{
        products.forEach((product) => this.products.push(product));

    }

    getProducts(): ECommerceProductProtocol[] {
        return this.products;
    }

    getTotal(): number {
        return this.products.reduce((sum, product) => sum + product.price, 0);
    }

    getTotalWithDiscount(): number {
    
        return this._discountStrategy.getDiscount(this);
    }

    set discount(discount: DiscountStrategy) {
        this._discountStrategy = discount;
    }
 }

export class DiscountStrategy {
    protected discount = 0;

    getDiscount(cart: ECommerceShoppingCart): number {
        return cart.getTotal();
    }
 }

 export class DefaultDiscount extends DiscountStrategy {
    protected discount = 0;

    getDiscount(cart: ECommerceShoppingCart): number {
        const total = cart.getTotal();
        if (total >= 100 && total < 200) {
            this.discount = 10;            
        } else if (total >= 200 && total < 300) {
            this.discount = 20;
        } else if (total >= 300){
            this.discount = 30;
        }
        return total - total * (this.discount / 100);
    }
 }

 export class NewDiscount extends DiscountStrategy {
    protected discount = 0;
    getDiscount(cart: ECommerceShoppingCart): number {
        const total = cart.getTotal();

        if (total >= 150){
            this.discount = 5;
        }

        return total - total * (this.discount / 100);
    }
 }

const shoppingCart = new ECommerceShoppingCart();

shoppingCart.discount = new DefaultDiscount();

shoppingCart.addProduct({name: 'Produto 1', price: 50});
shoppingCart.addProduct({name: 'Produto 2', price: 50});
shoppingCart.addProduct({name: 'Produto 3', price: 50});
shoppingCart.addProduct({name: 'Produto 4', price: 50});
shoppingCart.addProduct({name: 'Produto 5', price: 50});
shoppingCart.addProduct({name: 'Produto 6', price: 50});
console.log(shoppingCart.getTotal());
console.log(shoppingCart.getTotalWithDiscount())

```

## Problemas do Código Sem State

1. Acoplamento Elevado: 
O comportamento do carrinho está diretamente relacionado a verificações condicionais no código.

2.  Dificuldade em adicionar estados:
 Alterar ou adicionar novos estados exige modificar a lógica existente, violando o princípio de Aberto/Fechado.

3. Falta de Clareza:
 O estado do carrinho não é representado de forma explícita.

4. Manutenção complexa:
 Comportamentos adicionais podem complicar ainda mais as condições.

 ## Código com Padrão State
 No padrão State, criamos uma interface ShoppingCartState que define os comportamentos do carrinho. Os estados específicos (EmptyCartState, WithProductsState, ClosedCartState) implementam essa interface, encapsulando o comportamento de acordo com o estado atual do carrinho.


### classe ECommerceProductProtocol
``` js

export interface ECommerceProductProtocol {
    name: string;
    price: number;
}

```

### classe ShoppingCartState
``` js
import { ECommerceProductProtocol } from "./eecommerce-productprotocol";

export interface ShoppingCartState {
    addProduct(product: ECommerceProductProtocol): void;
    removeProduct(product: ECommerceProductProtocol): void;
    checkout(): void;
}

```
### classe ECommerceShoppingCart
``` js
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

```
### classe WithProductsState
``` js

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

```
### classe EmptyCartState
``` js
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

```

### classe ClosedCartState
``` js

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

```

## INDEX

``` js

import { ECommerceShoppingCart } from "./eecommerce-shopping-cart";


const shoppingCart = new ECommerceShoppingCart();


shoppingCart.addProduct({ name: 'Produto 1', price: 50 });
shoppingCart.addProduct({ name: 'Produto 2', price: 100 });


shoppingCart.removeProduct({ name: 'Produto 1', price: 50 });


shoppingCart.checkout();


shoppingCart.addProduct({ name: 'Produto 3', price: 150 });

```

## Por que o State é Melhor?
1.  Organização:
  Cada estado encapsula seu próprio comportamento, reduzindo a complexidade da classe principal.

 2. Respeito ao Princípio
  Aberto/Fechado: Novos estados podem ser adicionados sem modificar o código existente.

 3. Clareza no Código:
  O estado atual do carrinho é explicitamente gerenciado e representado.

4. Facilidade de Manutenção:
  Alterações são feitas isoladamente em estados específicos.

5. Reutilização:
  Os estados podem ser reutilizados em outras partes do sistema.

# Conclusão
## Padrão Strategy

 O padrão Strategy promove extensibilidade, flexibilidade e manutenção fácil no desenvolvimento de software. Ele é ideal
 para cenários em que múltiplos comportamentos relacionados precisam ser alternados dinamicamente, como no
 exemplo de cálculo de descontos.

## Padrão State
 O padrão State facilita a implementação de sistemas que precisam alterar comportamentos dinamicamente com base em
 estados. Ele promove código modular, reduz acoplamento e melhora a escalabilidade e manutenção do sistema.
