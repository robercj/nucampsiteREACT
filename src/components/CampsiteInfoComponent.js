import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class CampsiteInfo extends Component {

    renderCampsite(campsite) {
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

    renderComments(comments) {
        if (comments) {
            return (
                <div className='col-md-5 md-1'>
                    <h4>COMMENTS</h4>
                    {comments.map(comment => (<>{comment.text} < br /> {comment.author} {comment.date}</>))}
                </div>
            )
        }
    }

    render() {
        if (this.props.campsite) {
            return (
                <div className='container'> 
                    <div className='row'>
                        {this.renderCampsite(this.props.campsite)}
                        {this.renderComments(this.props.campsite.comments)}
                    </div>
                </div>
                    )
            }
        else {
            return <div />
            }
    }
}
export default CampsiteInfo;