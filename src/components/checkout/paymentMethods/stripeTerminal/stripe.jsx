import React, {Component} from "react";
import StripeHeader from "./stripeHeader";
import StripeBody from "./stripeBody";
import StripeCancel from "./stripeCancelPayment";




class Stripe extends Component {
    state = {
        cashTender : 0.0,
        stopInterval : false,
    };

handleStopInterval = (x) =>{
    this.setState({stopInterval : x});
}

    render() {
        return (
            <div className='container'>
                <div>
                    {this.props.stripe ?
                        <div>
                            {window['stripeCheckout()']}
                            <div className="modal modal-dialog-centered cash-modal" id="staticBackdrop" data-bs-backdrop="static"
                                 data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel"
                                 aria-hidden="true">
                                <div className="modal-dialog productModal">
                                    <div className="modal-content">
                                        {/*<StripeHeader*/}
                                        {/*    handleStripe = {this.props.handleStripe}*/}
                                        {/*    getTotalDue = {this.props.getTotalDue}*/}
                                        {/*/>*/}

                                        <StripeBody
                                            getTotalDue = {this.props.getTotalDue}
                                            handleTendered = {this.props.handleTendered}
                                            handlePaymentMethods = {this.props.handlePaymentMethods}
                                            handleStripe = {this.props.handleStripe}
                                            stripe = {this.props.stripe}
                                            handleStopInterval = {this.handleStopInterval}
                                            stopInterval = {this.state.stopInterval}
                                        />
                                        <StripeCancel
                                            handleStripe = {this.props.handleStripe}
                                            handleStopInterval = {this.handleStopInterval}
                                        />
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

}

export default Stripe;