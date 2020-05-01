import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/footer';
import Search from '../../components/Search/Search';
import { connect } from 'react-redux';
import { showSearch } from '../../store/actions';

class Layout extends Component{

    render(){
        console.log('show search',this.props.showSearch)
        return(
            <div>
                <Header/>
                    <Search
                    show={this.props.showSearch}
                    />
                    <main>
                        {this.props.children}
                    </main>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        showSearch : state.showSearch
    }
}

export default connect(mapStateToProps)(Layout);