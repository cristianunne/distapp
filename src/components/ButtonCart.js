import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, TYPES_BTN } from '../styles/common_styles';

const ButtonCart = ({onPress}) => {
    return (
        <TouchableOpacity style={[styles.container, 
            styles.primary
        ]} onPress={onPress}>

                  <Image source={require('../images/cart.png')} style={styles.bottomTabIcon} />
                

        </TouchableOpacity>
    );
}

export default ButtonCart

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
    },
    bottomTabIcon: {
        width: 30,
        height: 30,
        tintColor: '#ffffff'
    },

    primary: {
        backgroundColor: COLORS.SUCCESS
    },

});
