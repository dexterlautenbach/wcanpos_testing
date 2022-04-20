import React, {Component} from "react";
import CheckoutHeader from "./checkoutHeader";
import CheckoutBody from "./checkoutBody/checkoutBody";
import PaymentMethods from "./paymentMethods";
import EndTransaction from "./endTransaction/endtransaction";


class Checkout extends Component {
    state = {
        tendered: 0,
        paymentMethods: [],
    };

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

    getTotal = () => {
        const subTotal = this.getSubtotal();
        const HST = this.getHST();
        let total = subTotal + HST;

        return total;
    }

    getTotalDue = () => {
        const getTotal = this.getTotal();
        const tendered = Number(this.state.tendered);
        let totalDue = getTotal - tendered;

        return totalDue;
    }

    handleTendered = (amount) => {
        amount = Number(amount);
        const current = Number(this.state.tendered);
        let total = current + amount;
        this.setState({tendered: total});
    }

    handlePaymentMethods = (method) => {
        let paymentMethods = this.state.paymentMethods;
        paymentMethods.push(method);
        this.setState({paymentMethods: paymentMethods});
        //test on the change
    }


    render() {
        return (
            <div className='container'>
                <div>
                    {this.props.checkout ?
                        <div>
                            <div className="modal modal-dialog-centered" id="staticBackdrop" data-bs-backdrop="static"
                                 data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel"
                                 aria-hidden="true">
                                <div className="modal-dialog productModal">
                                    <div className="modal-content">
                                        <CheckoutHeader
                                            handleCheckoutClick={this.props.handleCheckoutClick}
                                        />
                                        <CheckoutBody
                                            cartList={this.props.cartList}
                                            getSubtotal={this.getSubtotal}
                                            getHST={this.getHST}
                                            getTotal={this.getTotal}
                                            getTotalDue={this.getTotalDue}
                                            tendered={this.state.tendered}
                                            paymentMethods={this.state.paymentMethods}

                                        />
                                        {this.testForTotalDue()}

                                    </div>
                                </div>
                            </div>
                        </div>

                        :
                        ''}
                </div>
            </div>

        );
    }

    testForTotalDue = () =>{
        const totalDue = Number(this.getTotalDue()).toFixed(2);
        const actions = totalDue > 0 ?
            <PaymentMethods
                getTotalDue={this.getTotalDue}
                handleTendered={this.handleTendered}
                handlePaymentMethods={this.handlePaymentMethods}
            />
         :
            <EndTransaction

            />

        ;
        return actions;
    }

}

export default Checkout;