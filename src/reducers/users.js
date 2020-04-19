import {RECEIVE_USERS, ADD_ANSWER, ADD_QUESTION_USER} from "../actions/users";

export default function users(state={}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users,
            };
        case ADD_ANSWER:
            return {
                ...state,
                [action.authedUser.id]: {
                    ...action.authedUser,
                    answers: {
                        ...action.authedUser.answers,
                        [action.qid]: action.answer,
                    }
                },
            };
        case ADD_QUESTION_USER:
            return {
                ...state,
                [action.authedUser.id]: {
                    ...action.authedUser,
                    questions: action.authedUser.questions.concat(action.question.id)
                }
            }
        default:
            return state;
    }
}
