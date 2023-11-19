import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, TYPES_BTN } from '../styles/common_styles';

const ButtonDelete = ({onPress}) => {
  return (
    <TouchableOpacity style={[styles.container, 
        styles.primary
    ]} onPress={onPress}>

              <Image source={require('../images/trash.png')} style={styles.bottomTabIcon} />
            

    </TouchableOpacity>
  )
}

export default ButtonDelete

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#4BB543',
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3,
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3,
        height: 29,
        marginTop: 5
    },
    bottomTabIcon: {
        width: 22,
        height: 22,
        tintColor: '#ffffff'
    },

    primary: {
        backgroundColor: COLORS.DANGER
    },

});