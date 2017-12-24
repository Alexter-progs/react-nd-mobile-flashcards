import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'

import { red } from '../utils/colors'

export default class QuizItem extends Component {
    state = {
        isShowAnswer: false,
        bounceValue: new Animated.Value(1)
    }

    showAnswer = () => {
        this.showAnimation()
        this.setState(() => ({
            isShowAnswer: true
        }))
    }

    showQuestion = () => {
        this.showAnimation()
        this.setState(() => ({
            isShowAnswer: false
        }))
    }

    showAnimation = () => {
        const { bounceValue } = this.state
        Animated.sequence([
            Animated.timing(bounceValue, { duration: 200, toValue: 1.04}),
            Animated.spring(bounceValue, { toValue: 1, friction: 4})
        ]).start()
    }

    render() {
        if(!this.props.quizItem) {
            return (<View></View>)
        }

        const { bounceValue, isShowAnswer } = this.state
        const { answer, question } = this.props.quizItem

        const quizText = isShowAnswer ? answer : question
        return (
            <View>
                <View style={styles.itemContainer}>
                    <Animated.Text style={[styles.text, { transform: [{scale: bounceValue}]}]}>{quizText}</Animated.Text>
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
        color: red,
        fontWeight: 'bold'
    },
    flipCardBtn: {
        alignItems: 'center'
    }
})