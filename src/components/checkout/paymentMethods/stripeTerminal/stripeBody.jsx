import React, {Component} from "react";




class StripeBody extends Component {
    state = {

    };

    componentDidMount  ()  {
        let totalDue = Number( this.props.getTotalDue().toFixed(2)) ;
        totalDue = totalDue * 100;
        totalDue = totalDue.toFixed(0);
        window.stripeCheckout(totalDue);
        const that = this;

            const interval = setInterval (function() {
                if (window.stripeConfirmation == 0){}else{
                    clearInterval(interval);
                    that.handleStripeConfirmation();
                }
            }, 1000);



    }

    handleStripeConfirmation = () =>{
        const stripeConfirmation = window.stripeConfirmation;
        console.log(stripeConfirmation);
        const stripeTendered = Number (stripeConfirmation.charges.data[0].amount_captured) /100;
        this.props.handleTendered(stripeTendered);
        const paymentMethod = {
            name: stripeConfirmation.charges.data[0].payment_method_details.card_present.brand,
            value: stripeTendered,
            change: 0,
            cashAdjustment : 0,
            account_type : stripeConfirmation.charges.data[0].payment_method_details.card_present.receipt.account_type,
            application_preferred_name : stripeConfirmation.charges.data[0].payment_method_details.card_present.receipt.application_preferred_name,
            dedicated_file_name : stripeConfirmation.charges.data[0].payment_method_details.card_present.receipt.dedicated_file_name,
            last4 : stripeConfirmation.charges.data[0].payment_method_details.card_present.last4,
        };
        this.props.handlePaymentMethods(paymentMethod);
        this.props.handleStripe(false);
    }


    render() {
        return (
            <div className="modal-body">
                Pass terminal to Customer
            </div>
        )
    }


}

export default StripeBody;