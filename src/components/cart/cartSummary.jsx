import React, {Component} from "react";

class CartSummary extends Component {
    state = {};

    render() {
        return (
            <div className="wrapper">
                <div className="subTotal">Sub-Total
                    <div className="subTotalPrice" align="right">${this.getSubtotal().toFixed(2)}</div>
                </div>
                <div className="cartDiscountWrapper">Discount 0%
                    <div className="cartDiscount" align="right">-$0.00</div>
                </div>
                <div className="subTotal">HST 13%
                    <div className="HST" align="right">${this.getHST().toFixed(2)}</div>
                </div>
                <div className="cartTotalWrapper">Total
                    <div className="cart-total" align="right">${this.getTotal().toFixed(2)}</div>
                </div>
            </div>

        );
    }

    getSubtotal = () => {
        let subTotal = 0;
        this.props.cartList?.map(item => {
            const price = Number(item.price);
            const qty = Number(item.quantity);
            let itemPrice = price * qty
            subTotal = subTotal + itemPrice;
        });
        return subTotal;
    }

    getHST = () => {
        const subTotal = this.getSubtotal();
        let HST = subTotal * 0.13;
        return HST;
    }

    getTotal = () =>{
        const subTotal = this.getSubtotal();
        const HST = this.getHST();
        let total = subTotal + HST;

        return total;
    }
}

export default CartSummary;