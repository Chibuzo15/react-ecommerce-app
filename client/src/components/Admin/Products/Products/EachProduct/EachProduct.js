import React, { Component } from 'react';
import classes from './Product.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';

class EachProduct extends Component {

    handleDelete = (id) => {
        this.props.onDeleteProduct(id);
        this.props.onGetProducts()
    }

    render(){
        return (
            <div className={classes.Product}>
                <div>{this.props.name}</div>
                <div>{this.props.price}</div>
                <div className= {classes.Actions}>
                    <div>EDIT</div>
                    <div
                    onClick = {() => this.handleDelete(this.props.id)}
                    >DELETE</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteProduct: (id) => dispatch(actions.deleteProduct(id)),
        onGetProducts : () => dispatch(actions.getProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EachProduct);