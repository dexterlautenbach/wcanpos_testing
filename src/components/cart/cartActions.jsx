import React, {Component} from "react";

class CartActions extends Component {
    state = {};

    render() {
        return (
            <div className="cart-actions">
                <button onClick={this.props.handleNewOrderClick} className="btn-danger btn-lg float-start">Clear Cart</button>
                <button onClick={this.props.handleCheckoutClick} className="btn-success btn-lg float-end">Checkout</button>
            </div>

        );
    };

}

export default CartActions;