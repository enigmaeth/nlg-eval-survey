import React, { Component } from 'react';
import { Button, div } from 'reactstrap';
import { connect } from 'react-redux';
import { addRipple, addTether, removeRipple, removeTether } from '../actions';

class Cards extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <row>
                    <Button color="primary" onClick={this.props.addTether}>
                        <strong>Add Tether</strong>
                    </Button> &nbsp;&nbsp;&nbsp;
                    <Button color="danger" onClick={this.props.removeTether}>
                        <strong>Remove Tether</strong>
                    </Button>
                </row><br/><br/>
                <row>
                    <Button color="primary" onClick={this.props.addRipple}>
                        <strong>Add Ripple</strong>
                    </Button> &nbsp;&nbsp;&nbsp;
                    <Button color="danger" onClick={this.props.removeRipple}>
                        <strong>Remove Ripple</strong>
                    </Button>
                </row>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTether: () => {
            dispatch(addTether())
        },
        removeTether: () => {
            dispatch(removeTether())
        },
        addRipple: () => {
            dispatch(addRipple())
        },
        removeRipple: () => {
            dispatch(removeRipple())
        }
    }
};

const mapStateToProps = state => {
    
}
  
const AddCards = connect(
    mapStateToProps,
    mapDispatchToProps
)(Cards)

export default AddCards;
