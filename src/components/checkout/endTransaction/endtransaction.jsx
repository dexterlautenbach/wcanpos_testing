import React, {Component} from "react";
import EndSale from "./endSale";

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


    getOrderData = () => {
        const lineItems = this.getLineItems();
        return {
            payment_method: 'cash',
            payment_method_title: 'Cash',
            set_paid: true,
            line_items: lineItems,
            status: 'completed',
            meta_data: [
                {
                    key: 'payment_amount',
                    value: 500
                }
            ]
        };

    }

    getLineItems = () => {
        let items = []
        this.props.cartList?.map(item =>
            items.push({
                product_id: item.id,
                quantity: item.quantity
            })
        )
        return items;
    }


    render() {
        const orderID = this.props.orderID;
        let buttons;
        if (orderID > 0) {
            buttons =
                <EndSale
                    cartList = {this.props.cartList}
                    orderID = {this.props.orderID}
                    paymentMethods = {this.props.paymentMethods}
                    handleNewOrderClick = {this.props.handleNewOrderClick}
                    handleNewOrderCheckout = {this.props.handleNewOrderCheckout}
                />;
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