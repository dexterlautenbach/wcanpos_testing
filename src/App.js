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
        wooOrder: 0,
    }

    componentDidMount() { //need to initialize the stripe terminal
        const apiSearch = "https://test.wateringcanworkshops.com/wp-json/pos_bridge/v1/stripe_connection_token?";
        const consumerKey = 'consumerKey=U59ws06BB0B00A2gL2saOx92o44w68R6ti1o26aquDYcT65b4728vcfYN7xA7XIifHenpr8qG6V0Cw76kJp7xsbeiHSdGUjxB2hUts74RGjBM3AHgm1HYb1xC4yg6k8yqo8nQN4QJa8aYvii1T0ot0VQ6nyDe0KARlvIv03Z84wO369LrY9V8Bm6v5L9N9fax0hJvj45';
        const secret = 'secret=VTE5eXq2zim496P6a82Y31x5xIUaI4reWI6dlKC5KZkDX7J1h3isK518yG6Ntngtt58lQcnIRxain39uK776pJ7QXR60600PX92RgmcSrFJ2s9getmfdB4mX4jo1HLjt850cyL139Q1eCBk3ZB5ZU5osmMjD6Ucl9mS0vjAilcf01p18f78aXM1oUa283dvkkf5Vi3c3';

        const url = apiSearch + consumerKey + "&" + secret;
        window.initializeTerminal(url);
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

    setWooOrder = (order) =>{
        this.setState({wooOrder: order});
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
                    setWooOrder = {this.setWooOrder}
                    wooOrder = {this.state.wooOrder}
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
