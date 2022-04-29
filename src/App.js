import React, {Component} from "react";
import AllProducts from "./components/allProducts";
import Cart from "./components/cart/cart";
import Categories from "./components/categoryMenu/categories";
import SelectedProducts from "./components/selectedProduct/selectedProduct";
import Checkout from "./components/checkout/checkout";
import ConnectToReader from "./components/connectToReader";


class App extends Component {
    state = {
        productList: [],
        selectedProductID: 0,
        updateSelectedProduct: false,
        cart: [],
        checkout: false,
        clearCheckout: false,
    }

    //need to set the product list from the all products component
    setProducts = allProducts => {
        this.setState({productList: allProducts});
        // this.setState({productID: 7466});
        //console.log(this.state.productList);
    };

    loadProducts = (id, product) => {
        this.setState({[id]: product});
    }

    getProducts = (prodID) => {
        return this.state[prodID];
    }

    getVariation = (variationID) => {
        return this.state[variationID];
    }

    handleProductSelection = (prodID, update) => {
        this.setState({updateSelectedProduct: update});
        this.setState({selectedProductID: prodID});
    }

    handleCart = (item) => {
        let cart = this.state.cart;
        cart.push(item);
        this.setState({cart: cart});
        /** this will send the cart info over to the stripe terminal */
        const lineItems = this.stripeCartLineItems();
        const subTotal =this.stripeCartSubtotal();
        const tax = this.stripeCartTax();

        window.stripeCartDisplay(lineItems, tax, subTotal);

    }

    stripeCartLineItems = () => {
        let items = [];
        this.state.cart?.map(item =>
            items.push({
                description: item.name,
                amount: Number(item.price).toFixed(2) * 100,
                quantity: Number(item.quantity),
            })
        )
        return items;
    }

    stripeCartTax = () => {
        let subtotal = 0;
        this.state.cart?.map(item =>
            subtotal = subtotal + (Number(item.price*item.quantity))
        )
        const tax = Number((subtotal * 0.13) * 100).toFixed(2);
        return tax;
    }
    stripeCartSubtotal = () => {
        let subtotal = 0;
        this.state.cart?.map(item =>
            subtotal = subtotal + (Number(item.price*item.quantity))
        )
        subtotal = Number(subtotal * 100).toFixed(2);
        return subtotal;
    }

    handleCheckoutClick = () => {
        this.state.checkout ? this.setState({checkout: false}) : this.setState({checkout: true});

    }

    handleNewOrderClick = () => {
        this.setState({checkout: false});
        this.setState({cart: []});
        this.setState({selectedProductId: 0});
        this.setState({updateSelectedProduct: false});
        this.setState({clearCheckout: true});

        window.clearStripeCartDisplay();

    }

    resetClearCheckout = () => {
        this.setState({clearCheckout: false})
    }

    handleCartItemRemoval = async (item) => {
        let newCart = [];

        this.state.cart?.map((product, i) => {
            if (i == item) {
            } else {
                newCart.push(product);
            }
        });
     await   this.setState({cart: newCart});
        //  console.log(newCart)
        /** this will send the cart info over to the stripe terminal */
        const lineItems = this.stripeCartLineItems();
        const subTotal =this.stripeCartSubtotal();
        const tax = this.stripeCartTax();
        window.stripeCartDisplay(lineItems, tax, subTotal);
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                </header>

                <AllProducts
                    productList={this.setProducts}
                    loadProducts={this.loadProducts}
                />
                <ConnectToReader />
                <SelectedProducts
                    prodID={this.state.selectedProductID}
                    updateProduct={this.state.updateSelectedProduct}
                    handleProductSelection={this.handleProductSelection}
                    getProducts={this.getProducts}
                    getVariation={this.getVariation}
                    handleCart={this.handleCart}
                />
                <Checkout
                    checkout={this.state.checkout}
                    handleCheckoutClick={this.handleCheckoutClick}
                    cartList={this.state.cart}
                    handleNewOrderClick={this.handleNewOrderClick}
                    clearCheckout={this.state.clearCheckout}
                    resetClearCheckout={this.resetClearCheckout}
                />
                <div className="pos-main">
                    <Cart
                        cartList={this.state.cart}
                        handleCheckoutClick={this.handleCheckoutClick}
                        handleNewOrderClick={this.handleNewOrderClick}
                        handleCartItemRemoval={this.handleCartItemRemoval}
                    />
                    <Categories
                        handleProductSelection={this.handleProductSelection}
                    />
                </div>


            </div>
        );
    }
}

export default App;
