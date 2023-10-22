import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text, TextInput } from 'react-native'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import CustomButton from '../../components/CustomButton'
import MyButton from '../../components/MyButton'
import { TYPES_BTN } from '../../styles/common_styles'

const ProductoDetailsScreen = ({ route, navigation }) => {

    const [icon, setIcon] = useState();

    const prod_compra = route.params.prod_compra;

    const [cantidad, setCantidad] = useState();

    const onChangeText = (text) => {

        setCantidad(text);
        console.log(cantidad);
    }




    useEffect(() => {
        setIcon('data:image/png;base64,' + route.params.prod_compra.image);
    }, [cantidad]);

    //console.log(route.params.prod_compra);
    return (
        <View style={styles.container}>
            <Header title={'Detalle Compra'} leftIcon={require('../../images/home.png')}
                rightIcon={require('../../images/cart.png')}></Header>

            <View style={styles.box_main}>
                {/* pon aquí el texto que quieras */}
                <View style={styles.box_icon}>
                    <Image source={{ uri: icon }} style={styles.icon} />
                </View>

                <View style={styles.box_text_content}>
                    <Text style={styles.text_header}>{prod_compra.name + ' (' + prod_compra.marca + ' - ' +
                        prod_compra.content + ' ' + prod_compra.unidad + ')'}</Text>

                    <Text>
                        {'Cantidad Pedida: ' + prod_compra.cantidad}
                    </Text>

                  

                </View>

                <View style={styles.box_input}>
                    <Text style={styles.label}>Cantidad: </Text>
                <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={cantidad}
                        placeholder="Ingrese la cantidad comprada"
                        keyboardType="numeric"
                    />

                </View>
                <View style={styles.box_btn}>
                    <MyButton text={'Aceptar'} type={TYPES_BTN.SUCCESS}></MyButton>
                </View>
                
            </View>


            <Footer />

        </View>
    )
}

export default ProductoDetailsScreen




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
        flex: 0.6,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 15,


    },


    box_text_content: {
        flexDirection: 'column',
        fontFamily: 'Roboto',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 0.15,
        marginTop: 7,

    },

    text_header: {
        fontFamily: 'Roboto',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#030303',
        marginBottom: 7,
        alignSelf: 'center'
    },


    box_icon: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',

    },
    icon: {
        width: '30%',
        height: '100%'
    },

    box_input: {
        flex: 0.2,
        justifyContent: 'flex-start',
        flexDirection: 'row'

    },
    label: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center'

    },

    input: {
        flex: 1,
        height: 40,
        margin: 12,
        borderWidth: 0.5,
        padding: 10,
        alignSelf: 'center'
    },

    box_btn: {
        flex: 0.1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
   
});