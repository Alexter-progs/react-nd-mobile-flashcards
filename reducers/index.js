import { RECEIVE_DECKS, ADD_CARD, ADD_DECK } from '../actions'

export default function reducer(state = {}, action) {
    switch(action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_CARD: {
            return {
                ...state,
                [action.deckTitle]: {
                    ...state[action.deckTitle],
                    questions: [
                        ...state[action.deckTitle].questions,
                        { ...action.card }
                    ]

                }
            }
        }
        case ADD_DECK: {
            return {
                ...state,
                [action.deckTitle]: {
                    title: action.deckTitle,
                    questions: []
                }
            }
        }
        default: 
            return state
    }
}