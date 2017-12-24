import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class QuizItem extends Component {
    state = {
        isShowAnswer: false
    }

    showAnswer = () => {
        this.setState(() => ({
            isShowAnswer: true
        }))
    }

    showQuestion = () => {
        this.setState(() => ({
            isShowAnswer: false
        }))
    }

    render() {
        if(!this.props.quizItem) {
            return (<View></View>)
        }
        return (
            <View>
                <View style={styles.itemContainer}>
                {
                    this.state.isShowAnswer ? (
                        <Text style={styles.text}>{this.props.quizItem.answer}</Text>

                    ) : (
                        <Text style={styles.text}>{this.props.quizItem.question}</Text>

                    )
                }
                </View>
                <View>
                { this.state.isShowAnswer ? (
                        <TouchableOpacity style={styles.flipCardBtn} onPress={this.showQuestion}>
                            <Text style={styles.flipCardText}>Question</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.flipCardBtn} onPress={this.showAnswer}>
                            <Text style={styles.flipCardText}>Answer</Text>
                        </TouchableOpacity>
                    )
                }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        marginBottom: 5
    },
    text: {
        fontSize: 20
    },
    flipCardText: {
        color: '#dd1919',
        fontWeight: 'bold'
    },
    flipCardBtn: {
        alignItems: 'center'
    }
})