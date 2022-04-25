import React, {Component} from "react";
import StripeHeader from "./stripeHeader";
import StripeBody from "./stripeBody";
import StripeConfirm from "./stripeConfirm";



class Stripe extends Component {
    state = {
        cashTender : 0.0,
    };

    handleCashTender = (amount) =>{
        amount = Number(amount);
        this.setState({cashTender : amount});
    }


    render() {
        return (
            <div className='container'>
                <div>
                    {this.props.stripe ?
                        <div>
                            <div className="modal modal-dialog-centered cash-modal" id="staticBackdrop" data-bs-backdrop="static"
                                 data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel"
                                 aria-hidden="true">
                                <div className="modal-dialog productModal">
                                    <div className="modal-content">
                                        <StripeHeader
                                            handleStripe = {this.props.handleStripe}
                                            getTotalDue = {this.props.getTotalDue}
                                        />
                                        <StripeBody

                                        />
                                        <StripeConfirm

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