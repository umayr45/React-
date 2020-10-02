import React, { Component } from 'react';
import { render } from 'react-dom';
import {  Label,Col,Input, Button,FormGroup,Row} from 'reactstrap';
import  {Control,Form,Errors,actions} from 'react-redux-form';
const required=(val)=>val &&val.length;
const maxLength=(len)=>(val)=>(val) && (val.length<=len);
const minLength=(len)=>(val)=>(val)&&(val.length>=len);
const isNumber=(val)=>!isNaN(Number(val));
const validEmail=(val)=>/^[\w\.\+\-]+@[\w.]+\.[\w]{2,4}$/i.test(val);


class Contact extends Component{
    
    constructor(props) {
    super(props);


        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(values){
        alert('Current state is'+JSON.stringify(values));
        this.props.resetFeedbackForm();
    
    }
    render(){
        return(
            <div className='container'>
                <div className='row '>
                    <div className='col-12'>  
                        <h3>Contact us</h3>
                        <hr/>
                    </div>
    
                </div>
                <div  className='row row-content'>
                    <div className='col-12'>
                    <h3> Location Information</h3>      
                    </div>
                    <div className='offset-1 col-12 col-sm-5'>
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className='col-12 col-sm-5 offset-sm-1'>
                        <h5>Map of our Location</h5>
    
                    </div>
                    <div className='col-12 offset-sm-1 col-sm-4'>
                        <div className='btn-group' >
                            <a role='button' className='btn btn-primary' href='tel:+85212345678' ><i className='fa fa-phone'></i> Call</a>
                            <a role='button' className='btn btn-info' href='www.skype.com'><i className='fa fa-skype'></i> Skype</a>
                            <a role="button" className="btn btn-primary" href="mailto:confusion@food.net"><i className="fa fa-envelope"></i> Mail</a>
    
                        </div>
    
                    </div>
    
                </div>
                <div className='row row-content'>
                    <div className='col-12'>
                        <h3>Send us your Feedback</h3>
                    </div>
                    <div className='col-12'>
                        <Form model="feedback" onSubmit={(values)=>this.handleSubmit(values)}>
                        <div className="form-group row">
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={6}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{required,minLength:minLength(3),maxLength:maxLength(15)}}
                                         />
                                    <Errors className='text-danger' model='.firstname' show='touched' messages={{required:"Required",minLength:'Min length must be greater than 3',maxLength:"Must be 15 characters max"}}/>
                                </Col>
                            </div>
                            <div className='form-group row'>
                                <Label htmlFor='lastname' md={2}>Last name</Label>
                                <Col md={6}>
                                    <Control.text model='.lastname' id='lastname' name='lastname'  placeholder='Last Name' 
                                     className='form-control' 
                                     validators={{required,minLength:minLength(3),maxLength:maxLength(15)}}/>
                                    <Errors className='text-danger' model='.lastname' show='touched' messages={{required:"Required ",minLength:'Min length must be greater than 3 ',maxLength:"Must be 15 characters max"}}/>
                               
                                      
                                </Col>
                            </div>    

                            <div className='form-group row'>
                                <Label htmlFor='telnum' md={2}>Contact.Tel</Label>
                                <Col md={6}> 
                                    <Control.text model='.tel'  id='telnum' name='telnum'  placeholder='Contact' 
                                     className='form-control' 
                                     validators={{required,minLength:minLength(3),maxLength:maxLength(15),isNumber}}  />
                                     <Errors className='text-danger' model='.tel' show='touched'  messages={{required:"Required ",minLength:'Min length must be greater than 3 ',
                                                                        maxLength:"Must be 15 characters max",isNumber:'Should be a number'}}/>
                                        
                                </Col>
                            </div>    

                            <div className='form-group row'>
                                <Label htmlFor='email' md={2}>Email</Label> 
                                <Col md={6}>
                                    <Control.text model='.email'  id='email'name='email'  placeholder='Email' 
                                     className='form-control' validators={{required,validEmail}}/>
                                     <Errors className='text-danger' model='.email' messages={{required:"Required ",validEmail:'Enter valid Email'}} show='touched'/>
                        
                                </Col>
                            </div>
                            <Row className='form-group'>
                                <Col md={{size:6,offset:2}}>
                                    <div className='form-check'>
                                    <Label check>
                                        <Control.checkbox model='.agree' name='agree'  className='form-check-input'/>
                                        <strong>May we contact you?</strong>

                                    </Label>


                                    </div>

                                </Col>
                                <Col md={{size:3,offset:1}}>
                                    <Control.select model='.contactType' name='contactType' className='form-control'>
                                        <option>Tel</option>
                                        <option>Email</option>
                                    </Control.select>

                                </Col>

                            </Row>
                            <Row className='form-group'>
                                <Label md={2} htmlFor='message'>Your Feedback</Label>
                                <Col md={8}>
                                
                                <Control.textarea rows='12' model='.message' name='message' id='message' className='form-control'/>

                                </Col>                                
                            </Row>
                            <Row className='form-group'>
                                <Col md={{offset:2}}>
                                    <Button color='primary' type='submit'>Send feedback</Button>
                                </Col>
                                 
                            </Row>
                        </Form>
                    </div>


                </div>

    
    
    
    
            </div>
        );

    }
        
    


}


    
export default Contact