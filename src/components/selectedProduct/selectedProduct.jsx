import React, {Component} from "react";
import ProductHeader from "./productHeader";
import ProductBody from "./productBody/productBody";
import AddItem from "./addItem";

class SelectedProducts extends Component {
    state = {
        loading: false,
        quantity: 1.00,
        discount: 0.00,
    };

    handlePriceChange = (event) => {
        const price = event.target.value;
        this.setState({price: price});
    }
    handleQtyChange = (event) => {
        const qty = event.target.value;
        this.setState({quantity: qty});
    }
    handleDiscountChange = (event) => {
        const discount = event.target.value;
        this.setState({discount: discount});
    }

    handleAddItem = () => {
        const item = {
            price: this.state.price,
            quantity: this.state.quantity,
            id : this.state.product.id,
            discount: this.state.discount,
            name: this.state.product.name
        }
        this.props.handleCart(item);
        this.setState({loading:false});
        this.setState({quantity:1.00});
        this.setState({discount:0.00});

    }

    async componentDidUpdate() {
        if (this.props.updateProduct) {
            const data = this.props.getProducts(this.props.prodID);
            this.props.handleProductSelection(this.props.prodID, false);
            this.setState({product: data});
            this.setState({price: data.price});
            this.setState({loading: true});
            this.setState({updateProduct: false});
          //  console.log('yes');
        }


    }

    render() {
        return (
            <div className='container'>
                <div>
                    {this.state.loading ?
                        <div>
                            <div className="modal modal-dialog-centered" id="staticBackdrop" data-bs-backdrop="static"
                                 data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel"
                                 aria-hidden="true">
                                <div className="modal-dialog productModal">
                                    <div className="modal-content">
                                        <ProductHeader
                                            name={this.state.product.name}
                                            handleCloseProduct={this.handleCloseProduct}
                                        />

                                        <ProductBody
                                            product={this.state.product}
                                            getVariation={this.props.getVariation}
                                            quantity={1.00}
                                            discount={0.00}
                                            handlePriceChange={this.handlePriceChange}
                                            handleQtyChange={this.handleQtyChange}
                                            handleDiscountChange={this.handleDiscountChange}
                                        />
                                        <AddItem
                                            handleAddItem = {this.handleAddItem}
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>

                        :
                        ''}
                </div>
            </div>

        );
    }

    handleCloseProduct = () => {
        this.setState({loading: false});
    }
}

export default SelectedProducts;