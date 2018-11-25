import React, { Component } from 'react';
import './Tickers.css';
import { Button, Jumbotron, Row } from 'reactstrap';
import { corpus } from './sentences';

class Tickers extends Component {

    constructor(props) {
        super(props);
        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
        this.readFromFile = this.readFromFile.bind(this);
        this.stopShow = this.stopShow.bind(this);
        this.startShow = this.startShow.bind(this);
        this.state = {
            file_counter: -1,
            line_counter: 0,
            displayTwo: <small>The sentences will appear here. Click on 'Next Set' to begin.</small>,
            showingAlert: false
        }
    }

    NodeNull(){

    }

    getNextTwo(){
        if(this.state.line_counter === 9){
        this.stopShow();
        }
        setTimeout(this.NodeNull, 1000);
        const sentences = this.readFromFile()
        this.setState({
            displayTwo: <h3>{sentences}</h3>
        })
    }

    readFromFile(){
        const sentence = this.state.allSentences[this.state.file_counter][this.state.line_counter]
        this.setState({
            line_counter: this.state.line_counter + 1 
        })
        return sentence;
    }

    chunkArray(myArray, chunk_size){
        const results = [];
        
        while (myArray.length) {
            results.push(myArray.splice(0, chunk_size));
        }
        return results;
    }
    

    componentDidMount(){
        this.setState({
            allSentences: this.chunkArray(corpus, 10)
        })
    }

    startShow(){
        this.setState({interval: setInterval(() => this.getNextTwo(), 1 * 1000)});
    }

    stopShow(){
        clearInterval(this.state.interval);
    }

    onNext(){
        clearInterval(this.state.interval);
        this.setState({
            // file_counter: Math.min(this.state.file_counter + 1, this.state.allSentences.length - 1)
            file_counter: this.state.file_counter + 1,
            line_counter: 0
        })
        this.startShow();
    }

    onPrev(){
        clearInterval(this.state.interval);
        this.setState({
            // file_counter: Math.max(0, this.state.file_counter - 1)
            file_counter: Math.max(0, this.state.file_counter - 1),
            line_counter: 0
        })
        this.startShow();
    }

    render() {
        return(
            <div>
                <br/>
                <h4>Set # {this.state.file_counter + 1}</h4>
                <p><strong>{this.state.line_counter} of 10</strong></p>
                <br></br>
                <Jumbotron>
                    {this.state.displayTwo}
                </Jumbotron>
                <Button color='primary' onClick={this.onNext}>Next Set</Button>{' '}
                <Button color='info' onClick={this.onPrev}>Previous Set</Button>{' '}
                <Button color='danger' onClick={this.stopShow}>Stop</Button>{' '}
            </div>
        )
    }
}

export default Tickers;
