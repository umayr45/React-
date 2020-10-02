import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, Label, Row, Col, ModalBody } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, Errors, LocalForm } from 'react-redux-form';
import LoadingComponent from './LoadingComponent';


    function RenderComments({comments,addComment,dishId}){
        if (comments===null){
            return (<div></div>)
        }   
        const cmnts=comments.map((comment)=>{
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>--{comment.author},  {new Intl.DateTimeFormat('en-US',{month:'short',day:'2-digit',year:'numeric'}).format(new Date(comment.date))}
                    </p>
                   
                </li>
            )
        })
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul type="none">
                        
                    {cmnts}
                    
                <CommentForm addComment={addComment} dishId={dishId}/>
                </ul>    
                

 
            </div>
        )
            
    }

    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                    
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }
 
    const Dishdetail=(props) =>{
        if(props.isLoading){
            return(<div className='container'> 
            <div className='row'>
                
            <LoadingComponent/>

            </div>
            </div>)
        }
        else if(props.errMess){
            return(<div className='container'> 
                <div className='row'>
                    
                    <h4>{props.errMess}</h4>

                </div>
            </div>)
        }

        else if(props.dish!=null){
            
            return(
                <div className="container">
                    <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    </div>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                        
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>        
                    </div>
                </div>
               
               
            );
        }
        else
            return(<div></div>);

    }
const required=(val)=>val &&val.length;
const maxLength=(len)=>(val)=>(val) && (val.length<=len);
const minLength=(len)=>(val)=>(val)&&(val.length>=len);
    class CommentForm extends Component{
        constructor(props){
            super(props);
            
            this.state={
                isModalOpen:false
            }
            this.toggleModal=this.toggleModal.bind(this);
            this.handleSubmit=this.handleSubmit.bind(this);
        }
        
        toggleModal(){
            this.setState({
                isModalOpen:!(this.state.isModalOpen)
            })
        
                
        }
        handleSubmit(values){
            this.props.addComment(this.props.dishId,values.rating,values.name,values.comment);
        }
        
        render(){
            return(<div>
            <Button outline onClick={this.toggleModal}><i className='fa fa-pencil'></i> Add Comment</Button>
            <Modal  isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Label md={4} htmlFor='rating'>Rating</Label>
                                <Col md={12}>
                                    <Control.select defaultValue='5' className='form-control' name='rating' id='rating' model='.rating' >
                                        <option >1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>

                                
                                </Col>
                            </Row>


                            <Row className='form-group'>
                                
                            <Label md={4} htmlFor='name'>Your Name</Label>
                            <Col md={12} >
                            
                            <Control.text className='form-control' name='name' id='name' model='.name' placeholder='Your Name' 
                                 validators={{required,minLength:minLength(3),maxLength:maxLength(15)}}></Control.text>
                            <Errors model='.name' className='text-danger' show='touched'  messages={{required:"Required",minLength:" Must be greater than 3 characters",maxLength:"Must be less than 15 characters"}}/>
                            </Col>

                            </Row>
                            <Row className='form-group'>
                                <Label  md={4} htmlFor='comment'>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea rows='6' className='form-control'  name='comment' model='.comment'></Control.textarea>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col>
                                
                                <Button  type='submit' color='primary'>Submit</Button>
                                </Col>
                                

                            </Row>
                    
                    </LocalForm>
                </ModalBody>

            </Modal>
            
            
            
            
            </div>)

        }
    }

        
    


export default Dishdetail