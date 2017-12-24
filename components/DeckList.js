import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { getDecks, removeDecks } from '../api'
import { receiveDecks } from '../actions'
import { gray, lightGray } from '../utils/colors'

class DeckList extends Component {
    renderItem = ({item}) => {
        return(
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', {deckTitle: item.title})}>
                    <View style={styles.deckItem}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.cardsCount}>{item.questions.length} cards</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    componentDidMount() {
        getDecks().then(decks => {
            return this.props.receiveDecks(decks)
        })
    }

    render() {
        const decks = this.props.decks
        if(!decks || decks.length === 0) {
            return (
                <View>
                    <Text>No decks</Text>
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <FlatList data={this.props.decks} keyExtractor={item => item.title} renderItem={this.renderItem}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    deckItem: {
        flex: 1, 
        height: 50, 
        alignItems: 'center', 
        borderStyle: 'solid',
         borderBottomWidth: 1, 
         borderColor: lightGray, 
         paddingTop: 50, 
         paddingBottom: 50
    },
    title: {
        fontSize: 20
    },
    cardsCount: {
        color: gray
    }
})

mapStateToProps = (state) => ({
    decks: Object.keys(state).map(key => {
        return state[key]
    })
})

mapDispatchToProps = (dispatch) => ({
    receiveDecks: (decks) => dispatch(receiveDecks(decks))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)