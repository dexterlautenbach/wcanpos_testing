import React, {Component} from "react";

class EndTransaction extends Component {
    state = {};

    componentDidMount() {
        // POST request using fetch with set headers
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.getOrderData())
        };
        fetch('https://test.wateringcanworkshops.com/wp-json/wc/v3/orders?consumer_key=ck_181949d267953fb08db6575c5aefcc09b6592080&consumer_secret=cs_4c327415a7ad72aafd384f806ca35b3a932d35f7', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));

        console.log(this.getOrderData());
    }

    getOrderData = () => {
        const lineItems = this.getLineItems();
        return {
            payment_method : 'cash',
            payment_method_title : 'Cash',
            set_paid : true,
            line_items : lineItems,
            status : 'completed',
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

            <div className="modal-footer" align="center">
                <div className="title">
                    <h4>Lets terminate this</h4>
                </div>
                <div className="paymentOptions">
                    <button className="btn-success btn-lg cashButton">Push to Woo</button>
                </div>
            </div>

        )
    }


}

export default EndTransaction;