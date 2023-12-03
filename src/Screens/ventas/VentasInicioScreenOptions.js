import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text, Alert } from 'react-native'
import Header from '../../components/Header'
import { LoadingModal } from 'react-native-loading-modal'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../../Context/ContextApp'
import { useIsFocused } from '@react-navigation/native';
import Footer from '../../components/Footer'

const VentasInicioScreenOptions = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const goToVentas = () => {
        navigation.navigate('VentasRealizadasScreen');
    }

    const goToResumenVentas = () => {
        navigation.navigate('VentasInicioScreen');
    }

    const goToVentasNotSentScreen = () => {
        navigation.navigate('VentasNotSentScreen');
    }


    const goToPedidosScreen = () => {
        navigation.navigate('PedidosInicioScreen');
    }

    return (
        <View style={styles.container}>

            <Header title={''} leftIcon={require('../../images/home.png')} />
            <LoadingModal modalVisible={isLoading} color={'#00ff00'} title={'Cargando....'} />

            <Text style={styles.text_title}>Ventas</Text>
            <View style={styles.box_main}>

                <View style={styles.item_content}>
                    <TouchableOpacity style={styles.item} onPress={goToResumenVentas}>
                        <Image source={require('../../images/dinero.png')} style={styles.iconItemGreen} />
                        <Text style={styles.text_icon}>Resumen de Ventas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item} onPress={goToVentas}>
                        <Image source={require('../../images/ventas.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Ventas Realizadas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item} onPress={goToVentasNotSentScreen}>
                        <Image source={require('../../images/ventas.png')} style={styles.iconItem_not} />
                        <Text style={styles.text_icon}>Ventas Sin Enviar</Text>
                    </TouchableOpacity>


                </View>

            </View>

            <Text style={styles.text_title}>Pedidos</Text>
            <View style={styles.box_main}>

                <View style={styles.item_content}>
                    <TouchableOpacity style={styles.item} onPress={goToPedidosScreen}>
                        <Image source={require('../../images/pedido.png')} style={styles.iconItemGreen} />
                        <Text style={styles.text_icon}>Ver Pedidos</Text>
                    </TouchableOpacity>

                   

                </View>

            </View>
            <Footer></Footer>
        </View>
    )
}

export default VentasInicioScreenOptions

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
        flex: 0.3,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 15,


    },
    item_content: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
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

        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'auto'
    },

    iconItem: {
        width: 60,
        height: 60,
    },
    iconItemGreen: {
        width: 50,
        height: 50,
    },

    iconItem_not: {
        width: 60,
        height: 60,
        tintColor: '#ff0000'
    },

    text_icon: {
        fontSize: 14,
        maxWidth: 100,
        alignSelf: 'center',
        textAlign: 'center',
    }
});