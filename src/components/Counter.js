import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Counter = () => {

    const [counterValue, setCounterValue] = useState(0)
    const [counterValueString, setCounterValueString] = useState('')

    const upCounter = () => {
        let val = counterValue + 1
        setCounterValue(val)
        setCounterValueString(counterValue.toString())
        console.log(counterValue);
    }

    const changeText = (value) => {
        setCounterValue(parseInt(value))
        setCounterValueString(counterValue.toString())

        console.log(counterValue);
    }

    useEffect(() => {

    }, [counterValue])


    return (
        <View style={styles.container}>
            <TouchableOpacity >
                <Icon name="minus" size={20} color="#27AAE1" />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                onChangeText={changeText}
                value={counterValueString}
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={upCounter}>
                <Icon name="plus" size={20} color="#27AAE1" />
            </TouchableOpacity>

        </View >
    )
}

export default Counter

const styles = StyleSheet.create({

    container: {
        flex: 0.5,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 7
    },
    input: {
        flex: 1,
        height: 25,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 0.5,
        padding: 2,
        alignSelf: 'center',
        alignContent: 'center',
        textAlign: 'center'
    },

});