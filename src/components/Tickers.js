import React, { Component } from 'react';
import './Tickers.css';
import { Button, Jumbotron, Row } from 'reactstrap';
import { corpus } from './sentences';
import ReactStars from 'react-stars'

class Tickers extends Component {

    constructor(props) {
        super(props);
        this.onNext = this.onNext.bind(this);
        this.readFromFile = this.readFromFile.bind(this);
        this.ratingChanged = this.ratingChanged.bind(this);
        this.state = {
            showingAlert: false,
            line_counter: 0,
            displayTwo: "These are sentences from Harry Potter books. For each sentence, give a rating on a scale of 1 through 5 if you think that the sentence seems like it must be from the books or if it seems like it must be generated from a computer. Use the scale of 1 to 5 to convey your degree of certainity with 1 being certainly from the books and 5 being certainly from a computer. Put a random rating to begin!",
            ratings: [],
            displayOne: "",
            sentences: []
        }
    }


    componentDidMount(){
        this.setState({
            sentences: this.readFromFile(),
        })
    }

    readFromFile(){
        const shuffled = corpus.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 11);
        return selected;
    } 

    onNext(){
        this.setState({
            displayTwo: this.state.sentences[this.state.line_counter + 1],
            line_counter: this.state.line_counter + 1
        })
        this.setState({
            ratings: [
                ...this.state.ratings,
                this.state.current
            ]
        })
        console.log(this.state);
    }

    stopShow(){
        let timestamp = + new Date(); 
        fetch('https://webhook.site/5e2489da-004b-429c-a4ef-bbe08b977786', {
        method: 'POST',
        body: JSON.stringify({
            timestamp: timestamp,
            ratings: this.state.ratings,
            })
        })
        fetch('https://webhook.site/f8a5bb2b-b278-46ea-a30f-f433f241b68c', {
        method: 'POST',
        body: JSON.stringify({
            timestamp: timestamp,
            ratings: this.state.ratings,
            })
        })
    }

    ratingChanged(newRating){
        this.setState({current: newRating + ":" + this.state.sentences[this.state.line_counter]})
        this.onNext();
    }

    render() {
        let sButton = "";
        let instr = "";
        if(this.state.line_counter > 0){
            instr = <p> These are sentences from Harry Potter books. For each sentence, give a rating on a scale of 1 through 5
            if you think that the sentence seems like it must be from the books or if it seems like it must be
            generated from a computer. Use the scale of 1 to 5 to convey your degree of certainity with 1 being 
            certainly from the books and 5 being certainly from a computer.
            Put a random rating to begin!
        </p>
        }
        if(this.state.line_counter <= 10 ){
            sButton = "Rating will take you to next sentences by default!";
        }
        else{
            sButton = this.stopShow();
            return "Thanks for giving your input!";
        }
        return(
            <div>
                <br/>
               {instr}
                <p><strong>{this.state.line_counter} of 10</strong></p>
                <br></br>
                <Jumbotron>
                    <font size="5">{this.state.displayTwo}</font>
                    <br/><br/>
                    <span style={{margin:"auto", color: '#191970'}}>
                        Author : 1 {'  '} &nbsp;&nbsp; &nbsp;
                        Computer : 5
                        </span>
                        <br/>
                    <div class="row">
                    
                    <div style={{margin:"auto"}}>
                        <ReactStars
                            count={this.state.default_count}
                            onChange={this.ratingChanged}
                            size={44}
                            color2={'#7CFC00'}
                            half={false}
                        />
                    </div>
                </div>
                </Jumbotron>
                {sButton}
            </div>
        )
    }
}

export default Tickers;
