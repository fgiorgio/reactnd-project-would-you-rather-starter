export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_VOTE = 'ADD_VOTE';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function addVote({question,answer,authedUserId}) {
    return {
        type: ADD_VOTE,
        question,
        answer,
        authedUserId,
    }
}
