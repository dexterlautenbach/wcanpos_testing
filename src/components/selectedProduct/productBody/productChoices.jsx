import React, {Component} from "react";


class ProductChoices extends Component {
    state = {};

    handleFocus = (event) => event.target.select();

    handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            this.props.handleAddItem();
        }
    }


    render() {
        return (

                <div className="productChoices" align="left">
                    <div className="productName" id="productName">
                        <h6>{this.props.product.name}</h6>
                    </div>
                    <div className="productInputs" align="center">
                        <label>Price
                            <input type="number" defaultValue={this.props.product.price} id="price" onChange={this.props.handlePriceChange} autoFocus onFocus={this.handleFocus} onKeyUp={this.handleKeyPress}/>
                        </label>
                        <label>Quantity
                            <input type="number" defaultValue={this.props.quantity} id="quantity" onChange={this.props.handleQtyChange} onKeyUp={this.handleKeyPress}/>
                        </label>
                        <label>Discount
                            <input type="number" defaultValue={this.props.discount} id="discount" onChange={this.props.handleDiscountChange} onKeyUp={this.handleKeyPress}/>
                        </label>
                    </div>
                </div>

        )
    }


}

export default ProductChoices;