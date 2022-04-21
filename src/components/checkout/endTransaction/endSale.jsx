import React, {Component} from "react";

class EndSale extends Component {
    state = {};

    /** when this button is clicked, it will update the sale in woocommerce with all of the correct information of the sale.
     * this will allow the end user to go back and add both items and payment methods to the sale.
     *
     */

    createWooOrder ()  {
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
            payment_method : 'cash',
            payment_method_title : 'Cash',
            set_paid : true,
            line_items : lineItems,
            status : 'completed',
            meta_data:[
                {
                    key : 'payment_amount',
                    value: 500
                }
            ]
        };

    }

    getLineItems = () =>{
        let items = []
        this.props.cartList?.map(item =>
            items.push( {product_id: item.id,
                quantity: item.quantity})
        )
        return items;
    }


    render() {
        return (
                <div className="paymentOptions">
                    <button className="btn-danger btn-lg cashButton">End Sale</button>
                </div>
        )
    }


}

export default EndSale;