import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPES_BTN } from '../styles/common_styles';

const MyButton = ({type, text, onPress}) => {




  return (
    <TouchableOpacity style={[styles.container, 
        type == TYPES_BTN.SUCCESS ? styles.success : 
        type == TYPES_BTN.PRIMARY ? styles.primary : 
        type == TYPES_BTN.WARNING ? styles.warning : null
    ]} onPress={onPress}>
        <View>
    
           <Text style={styles.text}>{text}</Text>
           </View>
       
    </TouchableOpacity>
  )
}

export default MyButton


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#4BB543',
        height: 35,
        width: 70,
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
    },
    text: {
        color: 'white',
    },

    success: {
        backgroundColor: COLORS.SUCCESS,
    },
    primary: {
        backgroundColor: COLORS.PRIMARY
    },
    warning: {
        backgroundColor: COLORS.WARNING
    }
});