import React, {Component} from "react";
import CheckoutCartSummary from "./checkoutCartSummary";
import PaymentSummary from "./paymentSummary";



class CheckoutBody extends Component {
    state = {
    };


    render() {
        return (
            <div className="modal-body" align="left">
                <div className="col-5 mh-50 m-3 float-start">
                    <CheckoutCartSummary
                        getSubtotal = {this.props.getSubtotal}
                        getHST = {this.props.getHST}
                        getTotal = {this.props.getTotal}
                        getTotalDue = {this.props.getTotalDue}
                        tendered = {this.props.tendered}
                    />

                </div>
                <div className="col-6 m-3 float-end">
                    <PaymentSummary
                        paymenthMethods = {this.props.paymentMethods}
                    />

                </div>
            </div>
        )
    }



}

export default CheckoutBody;