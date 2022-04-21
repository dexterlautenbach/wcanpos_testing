import React, {Component} from "react";
import EndSale from "./endSale";
import ReactToPrint from "react-to-print";
import PrintReceipt from "./printReceipt";

class EndTransaction extends Component {
    state = {};

    /** when this compoentent is fired, first thing it needs to do is create a basic order inside of woo so that we may get the order number
     * the order number is handed back to the main checkout component.
     * only when user selects "finish sale" does all the order information get pushed through
     */

    componentDidMount() {
        (this.props.orderID > 0) ? console.log(this.props.orderID) : this.createWooOrder();


    }

    createWooOrder() {
        // POST request using fetch with set headers
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

        };

        fetch('https://test.wateringcanworkshops.com/wp-json/wc/v3/orders?consumer_key=ck_181949d267953fb08db6575c5aefcc09b6592080&consumer_secret=cs_4c327415a7ad72aafd384f806ca35b3a932d35f7', requestOptions)
            .then(response => response.json())
            .then((data) => {
                this.setState({order: data});
                this.props.setorderID(data.id);
            });
    }


    render() {
        const orderID = this.props.orderID;
        let buttons;
        if (orderID > 0) {
            buttons =
                <div className="wrapper">
                    <ReactToPrint
                        trigger={() => {
                            return <button className="btn-success btn-lg">Print Receipt</button>
                        }}
                        content={() => this.componentRef}
                    />
                    <div style={{display: "none"}}>
                    <PrintReceipt ref={(el) => (this.componentRef = el)}
                                  orderID={this.props.orderID}
                                  wooOrder={this.state.order}
                                  cartList = {this.props.cartList}
                                  getSubtotal = {this.props.getSubtotal}
                                  getHST = {this.props.getHST}
                                  getTotal = {this.props.getTotal}
                                  getTotalDue = {this.props.getTotalDue}
                                  paymentMethods={this.props.paymentMethods}
                                  amountTendered = {this.props.amountTendered}
                    />
                    </div>

                    <EndSale
                        cartList={this.props.cartList}
                        orderID={this.props.orderID}
                        paymentMethods={this.props.paymentMethods}
                        handleNewOrderClick={this.props.handleNewOrderClick}
                        handleNewOrderCheckout={this.props.handleNewOrderCheckout}
                    />
                </div>;
        } else {
            buttons =
                <h3>Fetching Transaction Number</h3>

        }
        return (
            <div className="modal-footer" align="center">
                {buttons}
            </div>

        )
    }


}

export default EndTransaction;