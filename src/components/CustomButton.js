import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import CustomButtomStyle from '../styles/CustomButtomStyle'

export default function CustomButton({onPress, title}) {
    return (
        <TouchableOpacity
            style={CustomButtomStyle.button}
            onPress={() => {
                onPress();
            }
            }
        >
            <Text style={CustomButtomStyle.title}>{title}</Text>
        
        </TouchableOpacity>
    )
}
