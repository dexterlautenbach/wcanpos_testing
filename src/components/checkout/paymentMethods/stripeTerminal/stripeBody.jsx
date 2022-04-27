import React, {Component} from "react";




class StripeBody extends Component {
    state = {};

    componentDidMount() {
        let totalDue = Number( this.props.getTotalDue().toFixed(2)) ;
        totalDue = totalDue * 100;
        totalDue = totalDue.toFixed(0);
        window.stripeCheckout(totalDue);
        // do{
        //
        // } while (window.stripeConfirmation == 0);
        // console.log(window.stripeConfirmation);
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