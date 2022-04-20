import React, {Component} from "react";

class CartActions extends Component {
    state = {};

    render() {
        return (
            <button onClick={this.props.handleCheckoutClick} className="btn-success btn-lg">Checkout</button>

        );
    }

}

export default CartActions;