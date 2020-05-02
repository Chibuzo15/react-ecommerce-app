import React,{Component} from 'react';
import ProductCatalog from '../../components/Product/ProductCatalog/ProductCatalog';
import classes from './WhatsNew.module.css';
// import product1 from '../../assets/images/Products/suit-1.jpg'
// import product2 from '../../assets/images/Products/suit-2.jpg'
// import product3 from '../../assets/images/Products/suit-3.jpg'
import axios from 'axios';

class WhatsNew extends Component{
    state = {
        products : null
    }

    componentDidMount(){
        this.getProducts()
    }

    getProducts = () => {
        axios.get('/api/products')
        .then(res => {
            console.log(res.data)
            const product = res.data.map(product => {
                return {
                    id : product._id,
                    name : product.name,
                    price: product.price,
                    desc: product.description
                }
            })
            this.setState({
                products : product
            })
        })
        .catch(err => console.log(err))
    }

    render(){
        console.log(this.state.products)
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
                    <ProductCatalog
                    products = {this.state.products}
                    />
                    </div>
                </div>
                
                
            </div>
        )
    }
}

export default WhatsNew;