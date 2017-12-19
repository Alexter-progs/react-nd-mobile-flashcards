import { AsyncStorage } from 'react-native'

const FLASH_CARDS_APP_KEY = 'flashcardsapp'

export function saveDeck(title) {
    return AsyncStorage.mergeItem(FLASH_CARDS_APP_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        }
    }))
}

export function getDeck(key) {
    return AsyncStorage.getItem(FLASH_CARDS_APP_KEY).then(JSON.parse).then(store => Promise.resolve(store[key]))
}

export function getDecks() {
    return AsyncStorage.getItem(FLASH_CARDS_APP_KEY).then(JSON.parse).then(decks => Promise.resolve(decks))
}

export function addCardToDeck(key, card) {
    return getDecks(key).then(decks => {
        return AsyncStorage.setItem(FLASH_CARDS_APP_KEY, JSON.stringify({
            ...decks,
            [key]: {
                ...decks[key],
                questions: [
                    ...decks[key].questions,{
                        question: card.question,
                        answer: card.answer
                    }
                ]
            }
        }))
    })
}

export function removeDecks() {
    return AsyncStorage.removeItem(FLASH_CARDS_APP_KEY);
}