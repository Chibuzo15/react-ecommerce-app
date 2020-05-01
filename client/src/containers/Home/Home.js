import React,{ Component } from 'react';

import HomeCarousel from '../../components/HomeHero/HomeHero';
import Newsletter from '../../components/Newsletter/Newsletter';
import SingleProductLanding from '../../components/Product/singleProductLanding/singleProductLanding';
import classes from './Home.module.css';
import axios from 'axios';

class Home extends Component{
    state={
        products: null
    }

    getProducts = () => {
          axios.get('/api/products')
          .then(res => {
              console.log(res.data)
            // if(res.data){
            //   this.setState({
            //     products: res.data
            //   })
            // }
          })
          .catch(err => console.log(err))
      }
      
    render(){
        this.getProducts()
        return(
            <div className={classes.HomeWrapper}>
                <HomeCarousel/>
                <SingleProductLanding/>
                <Newsletter/>

            </div>
        )
    }
}

export default Home;