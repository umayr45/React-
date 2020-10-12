import React from 'react';
import {Card,CardImg,CardBody,CardText,CardTitle,CardSubtitle} from 'reactstrap';
import LoadingComponent from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl'

function RenderCard({item,isLoading,errMess}) {
    if(isLoading){
        return(<div><LoadingComponent/></div>)
    }
    else if(errMess){
    return(<div><h4>{errMess}</h4></div>)
    }
    else
        return(
            <Card>
                <CardImg src={baseUrl+ item.image} alt={item.name} />
                <CardBody>         
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );

}


function Home(props){
    return(
        <div className='container'>
            <div className='row '>
                <div className='col-12 col-md m-1'>
                    <RenderCard item={props.dish} isLoading={props.dishesLoading} errMess={props.disheserrMess}  />
                </div>
                <div className='col-12 col-md m-1'>
                    <RenderCard item={props.promotion} isLoading={props.promosLoading} 
                     errMess={props.promoserrMess}/>

                </div>
                <div className='col-12 col-md m-1'>
                    <RenderCard item={props.leaders}/>

                </div>
            </div>
        </div>
    )
}

export default Home