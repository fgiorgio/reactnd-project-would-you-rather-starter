import {_getUsers, _getQuestions, _saveQuestionAnswer} from '../api/_DATA';
import {addAnswer, receiveUsers} from "./users";
import {addVote, receiveQuestions} from "./questions";

export function handleInitialData() {
    return (dispatch) => {
        return Promise.all([
            _getUsers(),
            _getQuestions(),
        ]).then(([users, questions]) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
        });
    }
}

export function handleSubmitAnswer(qid, answer) {
    return (dispatch, getState) => {
        const {authedUser, users, questions} = getState();

        return _saveQuestionAnswer({authedUser, qid, answer})
            .then(() => {
                dispatch(addVote({
                    question: questions[qid],
                    answer,
                    authedUserId: authedUser,
                }));
                dispatch(addAnswer({
                    qid,
                    answer,
                    authedUser: users[authedUser],
                }));
            })
    }
}
