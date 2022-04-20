import React, {Component} from "react";

class CategoryButtons extends Component {
    state = {

    };


    render() {
        return (
                <button onClick={() => this.props.catSelection(this.props.catID)} type="button" className={this.getCatButtonClasses(this.props.name)}
                        value={this.props.catID}>{this.props.name}</button>

        );
    }

    getCatButtonClasses(name) {
        let
            classes = "btn-cat";
        classes += (name === 'empty') ? " empty" : "";
        return classes;
    }
}

export default CategoryButtons;