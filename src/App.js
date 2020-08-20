import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Main from './components/MainComponent'; 
import './App.css';
import { ConfigureStore } from './redux/configureStore';

import {Provider} from 'react-redux'
import {BrowserRouter } from 'react-router-dom';
class App extends Component {

  render() {
    
    const store = ConfigureStore();
    return (
      
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
      
    );
  }
}
export default App; 
