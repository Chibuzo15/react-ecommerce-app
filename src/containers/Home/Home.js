import React,{ Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/footer';

class Home extends Component{
    render(){
        return(
            <div>
                <Header/>
                <Footer/>
            </div>
        )
    }
}

export default Home;