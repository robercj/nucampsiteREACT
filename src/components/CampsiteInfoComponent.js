import React, {Component} from 'react';
import {ModalBody, Label, Col, Row, Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
const isNumber = val => !isNaN(+val);
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    )
}

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if (props.campsite) {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <div className='col'>
                            <Breadcrumb>
                                <BreadcrumbItem><Link to='/directory'>Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />       
                </div>
            </div>
        )
    }
    else {
        return <div />
    }
}

function RenderComments({ comments, postComment, campsiteId }) {
    if (comments) {
        return (
            <div className='col-md-5 md-1'>
                <h4>COMMENTS</h4>
                <Stagger in>
                    {
                        comments.map(comment => {
                            return (
                                <Fade in key={comment.id}>
                                    <div>
                                        <p>
                                            {comment.text}<br />
                                            -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                                        </p>
                                    </div>
                                </Fade>
                            );
                        })
                    }
                </Stagger>
                <row>
                    <div>
                        <br/>
                        <CommentForm campsiteId={campsiteId} postComment={postComment} />
                    </div>
                </row>
            </div>
        )
    }
}
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [name]: value
        });
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
    }
    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}><i class='fa fa-lg fa-pencil' /> SUBMIT COMMENT</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Leave a Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Label htmlFor="rating" className='col-12'>Rating</Label>
                                <Col md={10}>
                                    <Control.select
                                        model='.rating'
                                        id='rating'
                                        name='rating'
                                        placeholder='Select...'
                                        className='form-control'>
                                        <option>Select...</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="author" className='col-12'>Author</Label>
                                <Col md={10}>
                                    <Control.text
                                        model='.author'
                                        id='author'
                                        name='author'
                                        placeholder='Your name here...'
                                        className='form-control'
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}/>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="text" className='col-12'>Text</Label>
                                <Col md={10}>
                                    <Control.textarea
                                        rows={6}
                                        model='.text'
                                        id='text'
                                        name='text'
                                        placeholder='Your feedback here...'
                                        className='form-control' />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}
export default CampsiteInfo;