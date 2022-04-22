import React, {Component} from "react";
import Cash from "./paymentMethods/cash/cash";
import Stripe from "./paymentMethods/stripeTerminal/stripe";

class PaymentMethods extends Component {
    state = {
        cash : false,
        stripe : false,
    };

    handleCash = (x) => {
        this.setState({cash: x});
    }

    handleStripe = (x) => {
        this.setState({stripe: x});
    }


    render() {
        return (

            <div className="modal-footer" align="center">
                <div className="title">
                    <h4>Choose Payment Option</h4>
                </div>
                <div className="paymentOptions">
                    <button onClick={() => this.handleCash(true)} className="btn-success btn-lg cashButton">Cash</button>
                </div>
                <div className="paymentOptions">
                    <button onClick={() => this.handleStripe(true)} className="btn-success btn-lg cashButton">Card</button>
                </div>
                <div className="cashPayment">
                    <Cash
                        handleCash = {this.handleCash}
                        cash = {this.state.cash}
                        getTotalDue = {this.props.getTotalDue}
                        handleTendered = {this.props.handleTendered}
                        handlePaymentMethods = {this.props.handlePaymentMethods}
                    />
                </div>
                <div className="cashPayment">
                    <Stripe
                        stripe = {this.state.stripe}
                        handleStripe = {this.handleStripe}
                        getTotalDue = {this.props.getTotalDue}
                        handleTendered = {this.props.handleTendered}
                        handlePaymentMethods = {this.props.handlePaymentMethods}
                    />
                </div>
            </div>

        )
    }


}

export default PaymentMethods;