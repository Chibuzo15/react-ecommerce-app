import React, { Component } from 'react';

import classes from './Admin.module.css';
import SideBarItem from '../../components/Admin/SideBarItem/SideBarItem';
import Dashboard from '../../components/Admin/Dashboard/Dashboard';
import ProductsAdmin from '../../components/Admin/Products/ProductsAdmin';
// import { Redirect } from 'react-router-dom';

class Admin extends Component {
    state = {
        side_layout : [
            {name : 'dashboard'},
            {name : 'products'},
        ],
        content: 'dashboard'
    }

    handleItemClick = (item) => {
        console.log(item)
        this.setState({content: item})
    }

    renderClicked = () => {
        switch (this.state.content){
            case('dashboard'):
                return <Dashboard/>
            case('products'):
                return <ProductsAdmin/>
            default:
                return <Dashboard/>
        }
        
    }

    render() {
        const renderSideBar = this.state.side_layout.map(item => {
            return <SideBarItem 
            clickedItem = {(item) => this.handleItemClick(item)}
            key={item.name}>{item.name}</SideBarItem>
        })
        
        let contentToRender = this.renderClicked()

        return(
            <div className={classes.AdminWrap}>
               
                <div className={classes.SideBar}>Welcome User <br/> {renderSideBar} </div>
                <div className={classes.content}> {contentToRender} </div>
            </div>
        )
    }
}

export default Admin;