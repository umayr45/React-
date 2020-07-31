import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import {Switch , Route, Redirect} from 'react-router-dom';
import { PROMOTIONS } from '../shared/promotion';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leader';
class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      dishes:DISHES,
      comments:COMMENTS,
      leaders: LEADERS,
      promotion:PROMOTIONS
      
    };
    
  }

  render() {
    const HomePage=()=><Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]} 
    promotion={this.state.promotion.filter((promo)=>promo.featured)[0]} 
    leaders={this.state.leaders.filter((leader)=>leader.featured)[0]}  />
    
    return (
      <div className="App">
        <Header/>
        <Switch>
            <Route path='/home' component={HomePage}/>
            <Route exact path='/menu' component={ ()=><Menu dishes={this.state.dishes}/> }/>
            <Route path='/contactus' component={Contact}/>
            <Redirect to='/home'/>
          
        </Switch>
        


        <Footer/>


      </div>
    );
  }
}
export default Main; 
