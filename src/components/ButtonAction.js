import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS, TYPES_BTN } from '../styles/common_styles';

const ButtonAction = ({title, type, onPress}) => {
  return (
    <TouchableOpacity style={[styles.container,
        type == TYPES_BTN.SUCCESS ? 
        styles.success : type == TYPES_BTN.DANGER ? styles.danger : null
    ]} onPress={onPress}>

    <Text style={styles.text}>{title}</Text>
            

    </TouchableOpacity>
  )
}

export default ButtonAction

const styles = StyleSheet.create({
    container: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#4BB543',
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3,
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3,
        width: 100,
        height: 35,
      
    },

    danger: {
        backgroundColor: COLORS.DANGER,
      
    },
    success: {
        backgroundColor: COLORS.SUCCESS,
        
    },
    text: {
        color: '#FFFFFF'
    }

});