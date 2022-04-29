import React, {Component} from "react";
import PaymentFailed from "./paymentFailed";



class StripeBody extends Component {
    state = {};

    componentDidMount() {
        this.props.handleStopInterval(false);
        let totalDue = Number(this.props.getTotalDue().toFixed(2));
        totalDue = totalDue * 100;
        totalDue = totalDue.toFixed(0);

        const apiSearch = "https://test.wateringcanworkshops.com/wp-json/pos_bridge/v1/stripe_payment_intent?";
        const consumerKey = 'consumerKey=U59ws06BB0B00A2gL2saOx92o44w68R6ti1o26aquDYcT65b4728vcfYN7xA7XIifHenpr8qG6V0Cw76kJp7xsbeiHSdGUjxB2hUts74RGjBM3AHgm1HYb1xC4yg6k8yqo8nQN4QJa8aYvii1T0ot0VQ6nyDe0KARlvIv03Z84wO369LrY9V8Bm6v5L9N9fax0hJvj45';
        const secret = 'secret=VTE5eXq2zim496P6a82Y31x5xIUaI4reWI6dlKC5KZkDX7J1h3isK518yG6Ntngtt58lQcnIRxain39uK776pJ7QXR60600PX92RgmcSrFJ2s9getmfdB4mX4jo1HLjt850cyL139Q1eCBk3ZB5ZU5osmMjD6Ucl9mS0vjAilcf01p18f78aXM1oUa283dvkkf5Vi3c3';

        const url = apiSearch + consumerKey + "&" + secret + "&totalDue=" + totalDue; //url to get the payment intent

        const apiSearch2 = "https://test.wateringcanworkshops.com/wp-json/pos_bridge/v1/stripe_capture?";

        const url2 = apiSearch2 + consumerKey + "&" + secret; //url to capture the payment

        window.stripeCheckout(totalDue, url, url2);
        const that = this;

        const interval = setInterval(function () {
            //console.log('still going');
            if (that.props.stopInterval === true) {
                clearInterval(interval);
            }
            if (window.paymentError === true) {
                clearInterval(interval);
                that.setState({paymentFailed: true})
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
                    name: 'Interac',
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

    handlePaymentFailedComplete = () =>{
        this.setState({paymentFailed : false})
        this.props.handleStripe(false);
    }



    render() {
        return (
            <div className="wrapper">
                <div className="modal-body h4">
                    Pass terminal to Customer
                </div>
                {this.state.paymentFailed ?
                <PaymentFailed
                    handlePaymentFailedComplete = {this.handlePaymentFailedComplete}
                />

                : ''}

            </div>
        )
    }


}

export default StripeBody;