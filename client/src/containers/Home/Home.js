import React,{ Component } from 'react';

import HomeCarousel from '../../components/HomeHero/HomeHero';
import Newsletter from '../../components/Newsletter/Newsletter';
import SingleProductLanding from '../../components/Product/singleProductLanding/singleProductLanding';
import classes from './Home.module.css';

class Home extends Component{

    render(){
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