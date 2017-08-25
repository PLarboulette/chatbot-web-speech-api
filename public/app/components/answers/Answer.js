/**
 * Created by Pierre Larboulette on 26/05/2017.
 */

import React, { PropTypes } from 'react';


const AnswerView = ({answer}) => {
    return (
        <div>
            <p>
               Answer {answer.id}  --> {answer.text} !
            </p>
        </div>
    )
};

AnswerView.propTypes = {
    answer: PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
    })
};

const Answer = (props) => {
    return (
        <AnswerView answer={props.answer} />
    )
};

Answer.propTypes= {
    answer: PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
    })
};

export default Answer;
