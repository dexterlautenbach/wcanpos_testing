import React, {Component} from "react";
import Accordion from "./accordion/accordion";
import ProductChoices from "./productChoices";


class ProductBody extends Component {
    state = {};


    render() {
        return (
            <div className="modal-body" align="center">
                <ProductChoices
                    product = {this.props.product}
                    quantity = {this.props.quantity}
                    discount = {this.props.discount}
                    handlePriceChange = {this.props.handlePriceChange}
                    handleQtyChange = {this.props.handleQtyChange}
                    handleDiscountChange = {this.props.handleDiscountChange}
                    handleAddItem = {this.props.handleAddItem}
                />

                <Accordion
                    product = {this.props.product}
                    getVariation = {this.props.getVariation}
                />

            </div>
        )
    }



}

export default ProductBody;