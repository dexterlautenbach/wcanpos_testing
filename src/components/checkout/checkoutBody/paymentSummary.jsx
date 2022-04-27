import React, {Component} from "react";

class PaymentSummary extends Component {
    state = {

    };

    render() {
        return (
            <div className="wrapper">
                <h3>Payments</h3>
                <div className="border border-dark payment-summary">
                    {this.props.paymenthMethods?.map(function(method, i) {
                      return  <div className="payment-method" key={i}>
                            <div className="payment-method-name">{method.name}</div>
                            <div className="payment-method-value">{Number(method.value).toFixed(2)}</div>
                        </div>

                    }
                    )}
                </div>
            </div>

        );
    }


}

export default PaymentSummary;