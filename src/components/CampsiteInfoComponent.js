import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


function RenderCampsite({ campsite }) {
    return (
        <div className='col-md-5 m-1'>
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardTitle>{campsite.name}</CardTitle>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({ comments }) {
    if (comments) {
        return (
            <div className='col-md-5 md-1'>
                <h4>COMMENTS</h4>
                {comments.map(comment => (<>{comment.text} < br /> {comment.author} {comment.date}</>))}
            </div>
        )
    }
}

function CampsiteInfo(props){
    if (props.campsite) {
        return (
            <div className='container'> 
                <div className='row'>
                    <RenderCampsite campsite={props.campsite}/>
                    <RenderComments comments={props.campsite.comments} />
                </div>
            </div>
                )
        }
    else {
        return <div />
        }
}
export default CampsiteInfo;