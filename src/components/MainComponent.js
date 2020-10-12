import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {actions} from 'react-redux-form';
import { addComment,fetchDishes,fetchComments,fetchPromos} from '../redux/ActionCreators';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    commentsModal:state.commentsModal
  }
}

const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes:()=>{dispatch(fetchDishes())},
  fetchComments:()=>{dispatch(fetchComments())},
  
  fetchPromos:()=>{dispatch(fetchPromos())},
  resetFeedbackForm:()=>{dispatch(actions.reset('feedback'))}

});


class Main extends Component {
  constructor(props){
    super(props);
   
    
  }
  componentDidMount(){
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
  }
  render() {
    const HomePage=()=><Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]} 
    dishesLoading={this.props.dishes.isLoading} disheserrMess={this.props.dishes.errMess}
    promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]} 
    promosLoading={this.props.promotions.isLoading}
    promoserrMess={this.props.promotions.errMess}

    leaders={this.props.leaders.filter((leader)=>leader.featured)[0]}  />
    
   
    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10)) } 
            commentserrMess={this.props.comments.errMess} 

            isLoading={this.props.dishes.isLoading} errMess={this.props.dishes.errMess}
            addComment={this.props.addComment}/>
      );
    };  
    return (
      <div className="App">
        <Header/>
        <Switch>
            <Route path='/home' component={HomePage}/>
            <Route exact path='/menu' component={ ()=><Menu dishes={this.props.dishes}/> }/>
            <Route  path='/menu/:dishId' component={DishWithId}/>
            <Route path='/about' component={()=><About leaders={this.props.leaders}/>}/>

            <Route path='/contactus' component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
            <Redirect to='/home'/>
          
        </Switch>
        


        <Footer/>


      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
