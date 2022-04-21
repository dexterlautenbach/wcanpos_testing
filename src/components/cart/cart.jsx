import React, {Component} from "react";
import CartSummary from "./cartSummary";
import CartActions from "./cartActions";

class Cart extends Component {
    state = {
    };


    render() {
        return (
            <div className="col-5 mh-50 m-3 float-start">

                    <table className="table table-striped table-sm m-0">
                        <thead className="cart-head">
                        <tr>
                            <th className="w-50 p-3" scope="col">Description</th>
                            <th className="w-20 p-3" scope="col">Discount</th>
                            <th className="w-15 p-3" scope="col">Qty</th>
                            <th className="w-15 p-3" scope="col">Price</th>
                        </tr>
                        </thead>
                    </table>
                <div className="scroll-body">
                    <table className="table table-striped table-sm m-0">
                        <tbody>
                        {this.props.cartList?.map(function (product, i) {
                         return   <tr key={i}>
                                <td className="prodName">{product.name}</td>
                                <td className="prodDiscount">{product.discount}%</td>
                                <td className="prodQty">{product.quantity}</td>
                                <td className="prodPrice">${product.price}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="summaryWrapper">
                    <CartSummary
                        cartList = {this.props.cartList}
                    />
                </div>
                <div className="cartActionsWrapper">
                    <CartActions
                        handleCheckoutClick = {this.props.handleCheckoutClick}
                        handleNewOrderClick = {this.props.handleNewOrderClick}
                    />
                </div>
            </div>
        );
    }
}

export default Cart;