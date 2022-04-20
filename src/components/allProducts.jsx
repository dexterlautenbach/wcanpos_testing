import React, {Component} from "react";

class AllProducts extends Component {
    state = {
        loading: true,
      //  productCount: 0
    };

    async componentDidMount() {
        const apiSearch = "https://test.wateringcanworkshops.com/wp-json/pos_bridge/v1/products?";
        const consumerKey = 'consumerKey=U59ws06BB0B00A2gL2saOx92o44w68R6ti1o26aquDYcT65b4728vcfYN7xA7XIifHenpr8qG6V0Cw76kJp7xsbeiHSdGUjxB2hUts74RGjBM3AHgm1HYb1xC4yg6k8yqo8nQN4QJa8aYvii1T0ot0VQ6nyDe0KARlvIv03Z84wO369LrY9V8Bm6v5L9N9fax0hJvj45';
        const secret = 'secret=VTE5eXq2zim496P6a82Y31x5xIUaI4reWI6dlKC5KZkDX7J1h3isK518yG6Ntngtt58lQcnIRxain39uK776pJ7QXR60600PX92RgmcSrFJ2s9getmfdB4mX4jo1HLjt850cyL139Q1eCBk3ZB5ZU5osmMjD6Ucl9mS0vjAilcf01p18f78aXM1oUa283dvkkf5Vi3c3';

        const url = apiSearch + consumerKey + "&" + secret;
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data);

        let allProducts = [];
      //  let productCounter = 0;

        data?.map(product => {
                allProducts.push(product);
                this.props.loadProducts(product.id, product);
              //  productCounter++;
              //  this.setState({productCount: productCounter});
              //  this.forceUpdate();

        });
        this.props.productList(allProducts);
        this.setState({loading: false});
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
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="staticBackdropLabel">Gathering Products</h5>
                                        </div>
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
}

export default AllProducts;