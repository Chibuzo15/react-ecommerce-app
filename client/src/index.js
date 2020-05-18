import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

import UIreducer from './store/reducers/UI';
import authAdminReducer from './store/reducers/authAdmin';
import cartReducer from './store/reducers/cart';
import customerReducer from './store/reducers/customer';
import productReducer from './store/reducers/products';
import paymentReducer from './store/reducers/payment';
import orderReducer from './store/reducers/orders';

import { BrowserRouter } from 'react-router-dom';
import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  UI: UIreducer,
  cart: cartReducer,
  auth: authAdminReducer,
  customer: customerReducer,
  products: productReducer,
  payment: paymentReducer,
  order: orderReducer
});

let store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const public_url = window.location.origin.toString();

if( !public_url.includes("localhost")){
  console.log('Not on localhost, bypassing redux tools');
  store = createStore(rootReducer, 
    applyMiddleware(thunk)
  );
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
      <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
