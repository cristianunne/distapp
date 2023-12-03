import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useIsFocused } from '@react-navigation/native';


const PedidosScreen = () => {
    return (
        <View style={styles.container}>
        <Header title={'Compras'} leftIcon={require('../../images/home.png')}
            rightIcon={require('../../images/cart.png')}
        />



        <Footer />
    </View>
    )
}

export default PedidosScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed',
    },

    text_title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingLeft: 12,
        color: '#187351'
    },

    box_main: {
        flex: 0.5,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 15,


    },
    item_content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingLeft: 7,
        paddingRight: 7,
    },

    item_content_final: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
        paddingLeft: 7,
        paddingRight: 7,
    },
    item: {


        alignItems: 'center',
        alignSelf: 'auto'
    },

    iconItem: {
        width: 40,
        height: 40,
    },

    text_icon: {
        fontSize: 14
    }
});