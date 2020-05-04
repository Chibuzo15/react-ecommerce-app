import React,{Component} from 'react';
import ProductCatalog from '../../components/Product/ProductCatalog/ProductCatalog';
import classes from './WhatsNew.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class WhatsNew extends Component{
    state = {
        products : null
    }

    componentDidMount(){
        this.props.onGetProducts()
    }

    render(){
        let products = this.props.products ? <ProductCatalog products = {this.props.products} /> : <Spinner/> ;
        
        return(
            <div >
                <div className={classes.PageTitle}>
                    WHATS NEW
                </div>
                <div className={classes.PageWrapper}>
                    <div className={classes.Filter}>
                        Filter sidebar
                    </div>
                    <div className={classes.Catalog}>
                    {products}
                    </div>
                </div>
                
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products : state.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetProducts : () => dispatch(actions.getProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WhatsNew);