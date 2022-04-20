import React, {Component} from "react";


class ProductChoices extends Component {
    state = {};


    render() {
        return (

                <div className="productChoices" align="left">
                    <div className="productName" id="productName">
                        <h6>{this.props.product.name}</h6>
                    </div>
                    <div className="productInputs" align="center">
                        <label>Price
                            <input type="number" defaultValue={this.props.product.price} id="price" onChange={this.props.handlePriceChange}/>
                        </label>
                        <label>Quantity
                            <input type="number" defaultValue={this.props.quantity} id="quantity" onChange={this.props.handleQtyChange}/>
                        </label>
                        <label>Discount
                            <input type="number" defaultValue={this.props.discount} id="discount" onChange={this.props.handleDiscountChange}/>
                        </label>
                    </div>
                </div>

        )
    }


}

export default ProductChoices;