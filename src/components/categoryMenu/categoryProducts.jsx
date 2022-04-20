import React, {Component} from "react";
import ProductButtons from "./productButtons";
import CategoryButtons from "./categoryButtons";

class CategoryProducts extends Component {
    state = {
        products: this.props.products
    };

    render() {
        return (
            <div className="prodButtons">
                <ul className="productButtons">

                    {this.props.products?.slice(0, 5).map(row =>
                        <li className="liProducts" key={row.id}>
                            <ProductButtons
                                key={row.id}
                                id={row.id}
                                row='row1'
                                name={row.name}
                                prodID={row.prodID}
                                catSelection={this.handleCatSelection}
                                handleProductSelection={this.props.handleProductSelection}
                            />
                        </li>
                    )}


                    {this.props.products?.slice(5, 10).map(row =>
                        <li className="liProducts" key={row.id}>
                            <ProductButtons
                                key={row.id}
                                id={row.id}
                                row='row2'
                                name={row.name}
                                prodID={row.prodID}
                                catSelection={this.handleCatSelection}
                                handleProductSelection={this.props.handleProductSelection}
                            />
                        </li>
                    )}


                    {this.props.products?.slice(10, 15).map(row =>
                        <li className="liProducts" key={row.id}>
                            <ProductButtons
                                key={row.id}
                                id={row.id}
                                row='row3'
                                name={row.name}
                                prodID={row.prodID}
                                catSelection={this.handleCatSelection}
                                handleProductSelection={this.props.handleProductSelection}
                            />
                        </li>
                    )}


                    {this.props.products?.slice(15, 20).map(row =>
                        <li className="liProducts" key={row.id}>
                            <ProductButtons
                                key={row.id}
                                id={row.id}
                                row='row1'
                                name={row.name}
                                prodID={row.prodID}
                                catSelection={this.handleCatSelection}
                                handleProductSelection={this.props.handleProductSelection}
                            />
                        </li>
                    )}


                    {this.props.products?.slice(20, 25).map(row =>
                        <li className="liProducts" key={row.id}>
                            <ProductButtons
                                key={row.id}
                                id={row.id}
                                row='row2'
                                name={row.name}
                                prodID={row.prodID}
                                catSelection={this.handleCatSelection}
                                handleProductSelection={this.props.handleProductSelection}
                            />
                        </li>
                    )}


                    {this.props.products?.slice(25, 30).map(row =>
                        <li className="liProducts" key={row.id}>
                            <ProductButtons
                                key={row.id}
                                id={row.id}
                                row='row3'
                                name={row.name}
                                prodID={row.prodID}
                                catSelection={this.handleCatSelection}
                                handleProductSelection={this.props.handleProductSelection}
                            />
                        </li>
                    )}


                    {this.props.products?.slice(30, 35).map(row =>
                        <li className="liProducts" key={row.id}>
                            <ProductButtons
                                key={row.id}
                                id={row.id}
                                row='row1'
                                name={row.name}
                                prodID={row.prodID}
                                catSelection={this.handleCatSelection}
                                handleProductSelection={this.props.handleProductSelection}
                            />
                        </li>
                    )}

                </ul>
            </div>
        );
    }


}

export default CategoryProducts;