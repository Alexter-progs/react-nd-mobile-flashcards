import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { getDecks, removeDecks } from '../api'
import { receiveDecks } from '../actions'

class DeckList extends Component {
    renderItem = ({item}) => {
        return(
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', {deckTitle: item.title})}>
                    <View style={{flex: 1, height: 50, alignItems: 'center', borderStyle: 'solid', borderBottomWidth: 1, borderColor: '#123321', paddingTop: 50, paddingBottom: 50}}>
                        <Text>{item.title}</Text>
                        <Text>{item.questions.length} cards</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    componentDidMount() {
        getDecks().then(decks => {
            console.log(decks);
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
            <View style={{flex: 1}}>
                <FlatList data={this.props.decks} keyExtractor={item => item.title} renderItem={this.renderItem}/>
            </View>
        )
    }
}

mapStateToProps = (state) => ({
    decks: Object.keys(state).map(key => {
        return state[key]
    })
})

mapDispatchToProps = (dispatch) => ({
    receiveDecks: (decks) => dispatch(receiveDecks(decks))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)