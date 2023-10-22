
import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants'

const {heiht, width} = Dimensions.get('window');

const Header = ({title, leftIcon, rightIcon, onClickLeftIcon, onClickRightIcon}) => {
  return (
    <View style={styles.header}>
           <TouchableOpacity style={styles.btn}>
                <Image source={leftIcon} style={styles.icon} />
           </TouchableOpacity>

           <Text style={styles.text_title}>{title}</Text>

           <TouchableOpacity style={styles.btn}>
                <Image source={rightIcon} style={styles.righticon} />
           </TouchableOpacity>
    </View>
  )
}


export default Header;

const styles = StyleSheet.create({

    header: {
        width: width,
        heiht: 100,
        paddingTop: Constants.statusBarHeight + 10,
        backgroundColor: '#6ee7b7',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 10

    },
    btn: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: '#ffffff'
    },
    righticon: {
        width: 50,
        height: 50,
        tintColor: '#ffffff'
    },
    text_title:{
        color: '#187351',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold'


    }
})
