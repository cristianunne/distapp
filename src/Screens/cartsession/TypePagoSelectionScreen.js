import React, { useState } from 'react'
import Header from '../../components/Header'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ButtonAction from '../../components/ButtonAction';
import { TYPES_BTN } from '../../styles/common_styles';
import Footer from '../../components/Footer';
import ButtonIcon from '../../components/ButtonIcon';

const TypePagoSelectionScreen = ({ route }) => {

    const navigation = useNavigation();
    const productos = route.params.productos;
    const clientes = route.params.clientes;
    const [descuento, setDescuento] = useState();
    //console.log(productos);

    const subtotal = route.params.subtotal;
    const descuento_ = route.params.descuento;
    const total = route.params.total;
    const descuento_general = route.params.descuento_general;
    //console.log('aca va eldesc ' + descuento_general);

    const onChangeDescuento = (value) => {

        setDescuento(value);
    }

    const onPressCC = () => {
        navigation.navigate('VentaFinalScreen', {
            productos: productos,
            clientes: clientes,
            descuento_general: descuento_general,
            subtotal: subtotal,
            descuento: descuento_,
            total: total,
            type_pago: 2
        });
    }


    const onPressEfectivo = () => {
        navigation.navigate('VentaFinalScreen', {
            productos: productos,
            clientes: clientes,
            descuento_general: descuento_general,
            subtotal: subtotal,
            descuento: descuento_,
            total: total,
            type_pago: 1
        });

    }

    return (
        <View style={styles.container}>
            <Header title={'Descuento General'} leftIcon={require('../../images/home.png')}
            />
            <View style={styles.box_message}>
                <View style={styles.icon_info}>
                    <MaterialIcons name={'info'} size={90
                    } color="white" />
                </View>
                <View style={styles.text_content}>
                    <Text style={styles.text_info}>Seleccione el Tipo de pago</Text>
                </View>
            </View>


            <View style={styles.box_content}>
              

                <View style={styles.item_content}>
                    <TouchableOpacity style={styles.item} onPress={onPressCC}>
                        <Image source={require('../../images/tarjeta.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Cuenta Corriente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={onPressEfectivo}>
                        <Image source={require('../../images/dinero.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Efectivo</Text>
                    </TouchableOpacity>

             

             
            </View>
            </View>
            <Footer></Footer>
        </View>
    )
}

export default TypePagoSelectionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed',
    },

    box_message: {
        flex: 0.15,
        borderRadius: 10,
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        paddingBottom: 1,
        backgroundColor: '#009975bb'

    },
    text_content: {
        flex: 0.7,
        padding: 5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    item_content: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
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
        width: 40,
        height: 40,
    },

    text_icon: {
        fontSize: 12,
        maxWidth: 90,
        alignSelf: 'center',
        textAlign: 'center'
    },
    icon_info: {
        flex: 0.3,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text_info: {
        flexWrap: 'wrap',
        flex: 0.5,
        fontSize: 18,
        textAlign: 'justify',
        verticalAlign: 'middle',
        color: '#ffffff'

    },


    box_input: {
        flex: 0.5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: 20

    },
    label: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center'

    },

    box_content: {
        flex: 0.2,

        backgroundColor: '#ffffff',
        margin: 10,
        padding: 10
    },

    input: {
        flex: 1,
        height: 35,
        margin: 12,
        borderWidth: 0.4,
        padding: 5,
        alignSelf: 'center',
        borderColor: '#888888'
    },

    btn_container: {

        flex: 0.5,
        marginTop: 5,
        flexDirection: 'row',
        alignContent: 'space-between',
        gap: 100,
        alignItems: 'flex-end'

    },


});