import React, {Component} from "react";


class StripeBody extends Component {
    state = {

    };

    componentDidMount() {
        this.props.handleStopInterval(false);
        let totalDue = Number(this.props.getTotalDue().toFixed(2));
        totalDue = totalDue * 100;
        totalDue = totalDue.toFixed(0);
        window.stripeCheckout(totalDue);
        const that = this;

        const interval = setInterval(function () {
           // console.log('still going');
            if (that.props.stopInterval === true){
                clearInterval(interval);
            }
            if (window.stripeConfirmation == 0) {
            } else {
             //   console.log(window.stripeConfirmation);
                clearInterval(interval);
                that.handleStripeConfirmation();
            }
        }, 1000);


    }

    componentWillUnmount() {

    }

    handleStripeConfirmation = () => {
        const stripeConfirmation = window.stripeConfirmation;
     //   console.log(stripeConfirmation);
        let paymentMethod;
        /** Need to test for interact users */
        if (typeof stripeConfirmation.charges.data[0].payment_method_details.interac_present != "undefined") {
            //test to see if payment was captured
            if (stripeConfirmation.charges.data[0].captured === true) {

                const stripeTendered = Number(stripeConfirmation.charges.data[0].amount) / 100;
                this.props.handleTendered(stripeTendered);
                paymentMethod = {
                    name: stripeConfirmation.charges.data[0].payment_method_details.interac_present.brand,
                    value: stripeTendered,
                    change: 0,
                    cashAdjustment: 0,
                    account_type: stripeConfirmation.charges.data[0].payment_method_details.interac_present.receipt.account_type,
                    application_preferred_name: stripeConfirmation.charges.data[0].payment_method_details.interac_present.receipt.application_preferred_name,
                    dedicated_file_name: stripeConfirmation.charges.data[0].payment_method_details.interac_present.receipt.dedicated_file_name,
                    last4: stripeConfirmation.charges.data[0].payment_method_details.interac_present.last4,
                };
            } else {
                alert('Payment Not Captured');
            }
        } else {
            const stripeTendered = Number(stripeConfirmation.charges.data[0].amount_captured) / 100;
            this.props.handleTendered(stripeTendered);
            paymentMethod = {
                name: stripeConfirmation.charges.data[0].payment_method_details.card_present.brand,
                value: stripeTendered,
                change: 0,
                cashAdjustment: 0,
                account_type: stripeConfirmation.charges.data[0].payment_method_details.card_present.receipt.account_type,
                application_preferred_name: stripeConfirmation.charges.data[0].payment_method_details.card_present.receipt.application_preferred_name,
                dedicated_file_name: stripeConfirmation.charges.data[0].payment_method_details.card_present.receipt.dedicated_file_name,
                last4: stripeConfirmation.charges.data[0].payment_method_details.card_present.last4,
            };
        }
        this.props.handlePaymentMethods(paymentMethod);
        this.props.handleStripe(false);
    }


    render() {
        return (
            <div className="modal-body h4">
                Pass terminal to Customer
            </div>
        )
    }


}

export default StripeBody;