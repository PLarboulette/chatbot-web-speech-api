
import React, { PropTypes, Component} from 'react';

const socket = io();

// Component imports
import Item from './Answer'

const AnswersView =  ({answers, ask}) => {
    return (
        <div>
            <button onClick={() => ask()}>
                Poser une question
            </button>
            <ul>

                {answers.map(answer =>
                    <Item key={answer.id} answer={answer}/>
                )}
            </ul>
        </div>
    );
};


class Answers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answers : [],
            sentence : "Qu'est ce qui est jaune et qui attend ? \n"
        };
        this.manageEvents();
        this.ask = this.ask.bind(this);
    }

    manageEvents () {
        socket.on('response', (replyText)  =>{
            this.synthVoice(replyText);
            const answers = this.state.answers;
            answers.push(
                {
                    id : answers.length + 1,
                    text : replyText
                }
            );
            this.setState(answers);
        });
    }

    synthVoice(text) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = this.state.sentence + text; // Aggregate question and answer
        synth.speak(utterance);
    }


    ask () {
        socket.emit('message', this.state.sentence);
    };

    render () {
        return (
            <AnswersView answers={this.state.answers} ask={this.ask} />
        );
    }
}

Answers.propTypes = {
    answers: PropTypes.array,
    getAnswer: PropTypes.func,
    sentence: PropTypes.string,
};

export default Answers;