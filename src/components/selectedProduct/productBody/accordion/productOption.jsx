import React, {Component} from "react";
import ProductOptionButtons from "./productOptionButtons";

class ProductOption extends Component {
    state = {};


    render() {

        return (
            <div className="accordion-item">
                <h2 className="accordion-header" id='product-heading'>
                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        Product
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse show"
                     aria-labelledby="product-heading"
                     data-bs-parent="#product-accordion">
                    <div className="accordion-body">


                        {   this.props.product.variations.length?

                            this.props.product.variations?.map(variation => (
                                <ProductOptionButtons
                                    key={variation}
                                    id = {variation}
                                    name = {this.getVariationName(variation)}
                                />
                            ))
                            :
                                <ProductOptionButtons
                                    key = {this.props.product.id}
                                    id = {this.props.product.id}
                                    name = {this.props.product.name}
                                />
                        }



                    </div>
                </div>
            </div>
        )
    }

    getVariationName = (variationID) => {
        console.log(this.props.getVariation(variationID));
        return this.props.getVariation(variationID).name;

    }


}

export default ProductOption;