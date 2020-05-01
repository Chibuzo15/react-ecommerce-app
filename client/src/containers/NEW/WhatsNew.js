import React,{Component} from 'react';
import ProductCatalog from '../../components/Product/ProductCatalog/ProductCatalog';
import classes from './WhatsNew.module.css';
// import product1 from '../../assets/images/Products/suit-1.jpg'
// import product2 from '../../assets/images/Products/suit-2.jpg'
// import product3 from '../../assets/images/Products/suit-3.jpg'

class WhatsNew extends Component{
    render(){
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
                    />
                    </div>
                </div>
                
                
            </div>
        )
    }
}

export default WhatsNew;