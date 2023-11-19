import React, { useEffect, useState } from 'react'

import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, TYPES_BTN } from '../styles/common_styles';

const ButtonView = ({onPress, text, icon_, type}) => {

    const [icon, setIcon] = useState(require('../images/ojo.png'));

    useEffect(() => {

        if(icon_ == 'edit'){
            setIcon(require('../images/editar.png'));
        } else if(icon_ == 'ver') {
            setIcon(require('../images/ojo.png'));
        } else if(icon_ == 'enviar') {
            setIcon(require('../images/enviar.png'));
        } else if(icon_ == 'eliminar') {
            setIcon(require('../images/trash.png'));
        } else if(icon_ == 'sync') {
            setIcon(require('../images/sync.png'));
        } else if(icon_ == 'transferir') {
            setIcon(require('../images/transferencia.png'));
        } else if(icon_ == 'seleccionar') {
            setIcon(require('../images/check.png'));
        }
    })

   


  return (
    <TouchableOpacity style={[styles.container, 

        type == TYPES_BTN.SUCCESS ? styles.success : type == TYPES_BTN.WARNING ? styles.warning : type == TYPES_BTN.PRIMARY ? styles.primary : 
        type == TYPES_BTN.DANGER ? styles.danger : null

    ]} onPress={onPress}>

              <Image source={icon} style={styles.bottomTabIcon} />
              <Text style={styles.text}>{text}</Text>
            

    </TouchableOpacity>
  )
}

export default ButtonView

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
        marginTop: 10,
        flexDirection: 'row',
    },
    bottomTabIcon: {
        width: 22,
        height: 22,
        tintColor: '#ffffff',
        marginRight: 5

    
    },

    success: {
        backgroundColor: COLORS.SUCCESS
    },

    warning: {
        backgroundColor: COLORS.WARNING
    },
    primary: {
        backgroundColor: COLORS.PRIMARY
    },

    danger: {
        backgroundColor: COLORS.DANGER
    },
    text: {
        color: '#ffffff'
    }

});