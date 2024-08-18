
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants'
import { getCartSessionCount } from '../databases/Entity/CartSessionEntity';
import { useNavigation } from '@react-navigation/native'


const { heiht, width } = Dimensions.get('window');

const Header = ({ title, leftIcon }) => {

   

    const navigation = useNavigation();

    const [hasProduct, setHasProduct] = useState(false);

    const getProducts = async () => {

        const res_cantidad = await getCartSessionCount();

        if (res_cantidad != false){

            let number = res_cantidad.rows.item(0);

            if (number.cantidad > 0) {
                setHasProduct(true)
            } else {
                setHasProduct(false)
            }
            //console.log("cantidad " + number.cantidad);
        }
       

    }


    const onClickLeftIcon = () => {
        navigation.navigate('Home');
    }

    const onClickRightIcon = () => {
        navigation.navigate('CartSessionInicioScreen',  {
            idpedido : null,
            idcliente: null
        });
    }

    useEffect(() => {
        getProducts();

    })



    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.btn} onPress={onClickLeftIcon}>
                <Image source={leftIcon} style={styles.icon} />
            </TouchableOpacity>

            <Text style={styles.text_title}>{title}</Text>

            <TouchableOpacity style={styles.btn} onPress={onClickRightIcon}>
                {hasProduct ? <Image source={
                   require('../images/cart.png')
                } style={styles.righticon_red} /> : 
                <Image source={
                    require('../images/cart.png')
                 } style={styles.righticon} />}
                
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
    righticon_red: {
        width: 50,
        height: 50,
        tintColor: '#ff0000'
    },
    text_title: {
        color: '#187351',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold'


    }
})
