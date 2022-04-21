import React, {Component} from "react";

class EndSale extends Component {
    state = {};

    /** when this button is clicked, it will update the sale in woocommerce with all of the correct information of the sale.
     * this will allow the end user to go back and add both items and payment methods to the sale.
     *
     */

    updateWooOrder = () => {
        // POST request using fetch with set headers
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.getOrderData())

        };

        fetch('https://test.wateringcanworkshops.com/wp-json/wc/v3/orders/' + this.props.orderID + '?consumer_key=ck_181949d267953fb08db6575c5aefcc09b6592080&consumer_secret=cs_4c327415a7ad72aafd384f806ca35b3a932d35f7', requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
            });
    }


    getOrderData = () => {
        const lineItems = this.getLineItems();
        const metaData = this.getMetaData();
        return {
            payment_method: 'pos',
            payment_method_title: 'POS',
            set_paid: "true",
            line_items: lineItems,
            status: 'completed',
            meta_data: metaData,
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

    getMetaData = () => {
        let data = [];
        let paymentMethods = JSON.stringify(this.props.paymentMethods);
        data.push({
            key: '_pos_payment_methods',
            value: paymentMethods,
        });

        data.push({
            key: '_pos_transaction',
            value: "true",
        });
        return data;

    }


    render() {
        return (
            <div className="paymentOptions">
                <button onClick={() => this.updateWooOrder()} className="btn-danger btn-lg cashButton">End Sale</button>
            </div>
        )
    }


}

export default EndSale;