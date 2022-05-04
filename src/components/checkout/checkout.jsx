import React, {Component} from "react";
import CheckoutHeader from "./checkoutHeader";
import CheckoutBody from "./checkoutBody/checkoutBody";
import PaymentMethods from "./paymentMethods";
import EndTransaction from "./endTransaction/endtransaction";


class Checkout extends Component {
    state = {
        tendered: 0,
        paymentMethods: [],
        endSale : true,
        // orderID: 123456789,
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

    handleOrderCreation = (id) => {
        this.setState({orderID: id});
    }

    handleNewOrderCheckout = () => {
        this.setState({paymentMethods: []});
        this.setState({tendered: 0});
        this.setState({orderID: 0});
        this.props.resetClearCheckout();
    }

    componentDidUpdate() {
        if (this.props.clearCheckout === true) {
            this.handleNewOrderCheckout()
            //console.log('cleared cart');
        }
        ;

    }

    handleTerminateExit = (x) => {
        this.setState({endSale: x})
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
                                            endSale = {this.state.endSale}
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

    testForTotalDue = () => {
        const paymentMethods = this.state.paymentMethods;
        let totalDue;
        if (paymentMethods.length > 0) { //test for any payment methods
            const paymentMethodsLength = paymentMethods.length;
            const lastPayment = paymentMethods[paymentMethodsLength - 1];
          //  console.log(lastPayment);
            if (lastPayment.name == "Cash") { //test to see if last payment method was cash and if we need to round down the total due
               // console.log('yes it is');
                totalDue = Number(this.getTotalDue()).toFixed(2);
                totalDue = (Math.round(totalDue*20)/20).toFixed(2);
            } else {
            //    console.log('not it is not');
                totalDue = Number(this.getTotalDue()).toFixed(2);
            }
        } else {
             totalDue = Number(this.getTotalDue()).toFixed(2);
        }
        //const totalDue = Number(this.getTotalDue()).toFixed(2);
        const actions = totalDue > 0 ?
            <PaymentMethods
                getTotalDue={this.getTotalDue}
                handleTendered={this.handleTendered}
                handlePaymentMethods={this.handlePaymentMethods}
            />
            :
            <EndTransaction
                cartList={this.props.cartList}
                orderID={this.state.orderID}
                setorderID={this.handleOrderCreation}
                paymentMethods={this.state.paymentMethods}
                handleNewOrderClick={this.props.handleNewOrderClick}
                handleNewOrderCheckout={this.handleNewOrderCheckout}
                getSubtotal={this.getSubtotal}
                getHST={this.getHST}
                getTotal={this.getTotal}
                getTotalDue={this.getTotalDue}
                amountTendered={this.state.tendered}
                setWooOrder={this.props.setWooOrder}
                wooOrder={this.props.wooOrder}
                handleTerminateExit = {this.handleTerminateExit}
            />

        ;
        return actions;
    }

}

export default Checkout;