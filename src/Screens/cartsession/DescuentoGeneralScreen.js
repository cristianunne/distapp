import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ButtonAction from '../../components/ButtonAction';
import { TYPES_BTN } from '../../styles/common_styles';
import Footer from '../../components/Footer';

const DescuentoGeneralScreen = ({ route }) => {

    const navigation = useNavigation();
    const productos = route.params.productos;
    const clientes = route.params.clientes;
    const [descuento, setDescuento] = useState();
    //console.log(productos);

    const subtotal = route.params.subtotal;
    const descuento_ = route.params.descuento;
    const total = route.params.total;
    const fecha_venta = route.params.fecha_venta;


    const onChangeDescuento = (value) => {

        setDescuento(value);
    }

    const onPressCancel = () => {
        navigation.navigate('TypePagoSelectionScreen', {
            productos: productos,
            clientes : clientes,
            descuento_general : descuento,
            subtotal : subtotal,
            descuento : descuento_,
            total : total,
            fecha_venta: fecha_venta
        });
    }

    const onPressAcept = () => {
        navigation.navigate('TypePagoSelectionScreen', {
            productos: productos,
            clientes : clientes,
            descuento_general : descuento,
            subtotal : subtotal,
            descuento : descuento_,
            total : total,
            fecha_venta: fecha_venta
        });
        //console.log(descuento);

    }

    useEffect(() => {
        console.log('descuento');
         console.log(fecha_venta);

    }, [descuento])


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
                    <Text style={styles.text_info}>Puede aplicar un Descuento al total de la compra!</Text>
                </View>
            </View>


            <View style={styles.box_content}>
                    <View style={styles.box_input}>
                        <Text style={styles.label}>Descuento: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeDescuento}
                            value={descuento}
                            placeholder=""
                            keyboardType="numeric"
                        />

                    </View>
                    <View style={styles.btn_container}>
                        
                        <ButtonAction title={'Cancelar'} type={TYPES_BTN.DANGER} onPress={onPressCancel}></ButtonAction>
                        <ButtonAction title={'Aceptar'} type={TYPES_BTN.SUCCESS} onPress={onPressAcept}></ButtonAction>

                    </View>
                </View>
            <Footer></Footer>
        </View>
    )
}

export default DescuentoGeneralScreen

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