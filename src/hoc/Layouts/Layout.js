import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/footer';

class Layout extends Component{
    state={

    }

    render(){
        return(
            <div>
                <Header/>
                    <main>
                        {this.props.children}
                    </main>
                <Footer/>
            </div>
        )
    }
}

export default Layout;