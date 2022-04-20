import React, {Component} from "react";

class CheckoutCartSummary extends Component {
    state = {};

    render() {
        return (
            <div className="wrapper">
                <div className="subTotal">Sub-Total
                    <div className="subTotalPrice" align="right">${this.props.getSubtotal().toFixed(2)}</div>
                </div>
                <div className="cartDiscountWrapper">Discount 0%
                    <div className="cartDiscount" align="right">-$0.00</div>
                </div>
                <div className="subTotal">HST 13%
                    <div className="HST" align="right">${this.props.getHST().toFixed(2)}</div>
                </div>
                <div className="cartTotalWrapper">Sale Total:
                    <div className="cart-total" align="right">${this.props.getTotal().toFixed(2)}</div>
                </div>
                <div className="tenderedWrapper">Tendered:
                    <div className="tendered-total" align="right">${this.props.tendered.toFixed(2)}</div>
                </div>
                <div className="totalDueWrapper">Total Due:
                    <div className="totalDue-total" align="right">${this.props.getTotalDue().toFixed(2)}</div>
                </div>
            </div>

        );
    }


}

export default CheckoutCartSummary;