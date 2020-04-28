import React,{ Component } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/footer';
import HomeCarousel from '../../components/HomeHero/HomeHero';
import Newsletter from '../../components/Newsletter/Newsletter';

class Home extends Component{
    render(){
        return(
            <div>
                <Header/>
                <HomeCarousel/>
                <Newsletter/>
                <Footer/>
            </div>
        )
    }
}

export default Home;