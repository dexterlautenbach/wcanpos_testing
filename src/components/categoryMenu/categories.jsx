import React, {Component} from "react";
import CategoryProducts from "./categoryProducts";
import CategoryButtons from "./categoryButtons";

class Categories extends Component {
    state = {};

    async componentDidMount() {
        const apiSearch = "https://test.wateringcanworkshops.com/wp-json/pos_bridge/v1/category?";
        const consumerKey = 'consumerKey=U59ws06BB0B00A2gL2saOx92o44w68R6ti1o26aquDYcT65b4728vcfYN7xA7XIifHenpr8qG6V0Cw76kJp7xsbeiHSdGUjxB2hUts74RGjBM3AHgm1HYb1xC4yg6k8yqo8nQN4QJa8aYvii1T0ot0VQ6nyDe0KARlvIv03Z84wO369LrY9V8Bm6v5L9N9fax0hJvj45';
        const secret = 'secret=VTE5eXq2zim496P6a82Y31x5xIUaI4reWI6dlKC5KZkDX7J1h3isK518yG6Ntngtt58lQcnIRxain39uK776pJ7QXR60600PX92RgmcSrFJ2s9getmfdB4mX4jo1HLjt850cyL139Q1eCBk3ZB5ZU5osmMjD6Ucl9mS0vjAilcf01p18f78aXM1oUa283dvkkf5Vi3c3';

        const url = apiSearch + consumerKey + "&" + secret;
        // console.log(url);
        const response = await fetch(url);

        const data = await response.json();

        let catProducts = [];

        this.setState({categories: data});
        // console.log(this.state.categories);

        //run script to load products of first category
        this.state.categories?.slice(0, 1).map(async cat => {
            const catID = cat.catID;
            const url2 = "https://test.wateringcanworkshops.com/wp-json/pos_bridge/v1/catProduct?" + consumerKey + "&" + secret + "&catID=" + catID;
            const response2 = await fetch(url2);
            const data2 = await response2.json();
            //console.log(data2);
            this.setState({[catID]: data2});
            const catProducts = this.state[catID];
            this.setState({products: catProducts});
        });


        // run this to get all category products
        this.state.categories.map(async cat => {
            const catID = cat.catID;
            const url2 = "https://test.wateringcanworkshops.com/wp-json/pos_bridge/v1/catProduct?" + consumerKey + "&" + secret + "&catID=" + catID;
            const response2 = await fetch(url2);
            const data2 = await response2.json();
            //console.log(data2);
            this.setState({[catID]: data2});
            //  console.log(this.state[catID]);


        });


    }


    handleCatSelection = catID => {
        //console.log(catID);
        const catProducts = this.state[catID];
        this.setState({products: catProducts});
    }

    render() {
        return (
            <div className="col-6 m-3 float-end">
                <div className="catWrapper">
                    <div className="catButtons">
                        <ul className="categoryButtons">
                            {this.state.categories?.map(row =>
                                <li className="liCategory" key={row.id}>
                                    <CategoryButtons
                                        key={row.id}
                                        id={row.id}
                                        name={row.name}
                                        catID={row.catID}
                                        catSelection={this.handleCatSelection}
                                    />

                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="divider"></div>
                    <div className="prodButtons">
                        <CategoryProducts
                            products={this.state.products}
                            handleProductSelection={this.props.handleProductSelection}
                        />
                    </div>
                </div>
            </div>
        );
    }


}

export default Categories;