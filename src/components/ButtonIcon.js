import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, TYPES_BTN } from '../styles/common_styles';





const ButtonIcon = ({type, icon, size_, onPress}) => {
 

    return (
        <TouchableOpacity style={[styles.container, 
            type == TYPES_BTN.SUCCESS ? styles.success : 
            type == TYPES_BTN.PRIMARY ? styles.primary : 
            type == TYPES_BTN.WARNING ? styles.warning : null
        ]} onPress={onPress}>
        
                <MaterialIcons name={icon} size={
                    size_ == undefined ? 24 : size_
                } color="white" />
           
        </TouchableOpacity>
    );
}
export default ButtonIcon;

const styles = StyleSheet.create({
    container: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#4BB543',
        width: 45,
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        alignSelf: 'center'
    },

    success: {
        backgroundColor: COLORS.SUCCESS
    },
    primary: {
        backgroundColor: COLORS.PRIMARY
    },
    warning: {
        backgroundColor: COLORS.WARNING
    }
});
