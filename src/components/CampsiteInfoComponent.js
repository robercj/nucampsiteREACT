import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class CampsiteInfo extends Component {

    renderCampsite(campsite) {
        return (
            <div className='col-md-5 m-1'>
                <Card>
                    <CardImg top src={this.props.campsite.image} alt={this.props.campsite.name} />
                    <CardBody>
                        <CardTitle>{this.props.campsite.name}</CardTitle>
                        <CardText>{this.props.campsite.description}</CardText>
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
                    {this.props.comments.map( () => {}
                    )}
                </div>
            )
        }
        <h1>failed</h1>
    }

    render() {
        if (this.props.campsite) {
            return (this.renderCampsite())
        }
        else {
            return <div/>
        }
    }
}
export default CampsiteInfo;