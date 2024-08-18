
import React, { useEffect, useState } from 'react'
import { View, StyleShee, TouchableOpacity, StyleSheet, Text, Image, Alert } from 'react-native'
import { COLORS, TYPES_BTN } from '../styles/common_styles'
import { showMessage, hideMessage } from "react-native-flash-message";
import CustomButton from './CustomButton';
import ButtonEdit from './ButtonEdit';
import { useNavigation } from '@react-navigation/native'
import ButtonDelete from './ButtonDelete';
import { deleteProductoFromCartSessionDB } from '../databases/Entity/CartSessionEntity';

const ItemProductosCart = ({ producto, setIsLoading, reload, setReload }) => {


    /**
     * Number.prototype.format(n, x, s, c)
     * 
     * @param integer n: length of decimal
     * @param integer x: length of whole part
     * @param mixed   s: sections delimiter
     * @param mixed   c: decimal delimiter
     */
    Number.prototype.format = function (n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
            num = this.toFixed(Math.max(0, ~~n));

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };

    const navigation = useNavigation();


    const onPressEdit = () => {
        //lleva a la pantalla edit
        navigation.navigate('ProductoDetailsCartSessionScreen', {
            producto: producto
        });
    }

    const deleteProductoFromCart = async () => {
        Alert.alert('Eliminar', '¿Desea eliminar el producto del carrito?', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Aceptar', onPress: async () => {

                    setIsLoading(true);

                  
                    const del_res = await deleteProductoFromCartSessionDB(producto.id_cart_session);


                    setTimeout(()=> {
                        setIsLoading(false);
                       
                    }, 2000)

                    if(del_res){
                        showMessage({
                            message: "El Producto se elimino con éxito!",
                            type: "success",
                            icon: "success",
                            duration: 4000
                        });

                        //actualizo el padre
                        let rel = reload ? false : true;
                        setReload(rel);

                    } else {
                        showMessage({
                            message: "El Producto no se elimino con éxito. Intente nuevamente.",
                            type: "error",
                            icon: "error",
                            duration: 4000
                        });
                    }


                }
            },]);

    }

    useEffect(() => {

        //console.log(producto);

    })


    return (
        <View style={styles.container}>
            <View style={styles.label_container}>
                <Text style={[styles.label_category, {
                    backgroundColor:
                        producto.color
                }]}>{producto.cat_name}</Text>
            </View>
            <View style={styles.image_container}>
                <Image source={{ uri: 'data:image/*;base64,' + producto.image }} style={styles.bottomTabIcon} />
            </View>

            <View style={styles.description_container}>
                <Text style={styles.text_producto}>{producto.name + ' (' +
                    producto.marca + ')'}</Text>
                    <Text style={styles.text_producto}>
                        {producto.content + ' (' + producto.unidad + ')'}
                    </Text>
            </View>
            <View style={styles.prices_container}>
                <Text style={styles.prices_text_value}>$
                
                    {producto.cart_s_precio != null ?
                        (producto.cart_s_precio - producto.cart_s_descuento).format(2, 3, '.', ',') : 0}</Text>
            </View>

            <View style={styles.prices_container_sub}>


                <Text style={styles.precio_real}> $
                    {producto.cart_s_precio != null ?
                        producto.cart_s_precio.format(2, 3, '.', ',') : 0}</Text>

            </View>

            <View style={styles.prices_container_sub}>

                <Text style={styles.descuento_text_value}>
                    {producto.cart_s_descuento != null ? '$' +
                        producto.cart_s_descuento.format(2, 3, '.', ',') : 'S/D'}</Text>

            </View>

            <View style={styles.prices_container_sub}>
                <Text style={styles.cantidad_text}>
                    Cantidad:
                    {producto.cart_s_cantidad}
                </Text>
            </View>
            <View style={styles.btn_container}>
                <ButtonEdit onPress={onPressEdit}></ButtonEdit>
                <ButtonDelete onPress={deleteProductoFromCart}></ButtonDelete>
            </View>



        </View>
    )
}

export default ItemProductosCart

const styles = StyleSheet.create({

    container: {
        marginTop: 10,
        padding: 5,
        minWidth: '32%',
        maxWidth: '33%',
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        columnGap: 1

    },
    elevation: {
        shadowColor: '#164620',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 5 },
        elevation: 4,
        shadowRadius: 1,
    },
    label_container: {

        padding: 2

    },
    label_category: {
        alignSelf: 'flex-end',
        padding: 2,
        fontSize: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        color: '#ffffff',
    },
    image_container: {
        padding: 3,
        alignContent: 'center',
        alignItems: 'center',
    },
    bottomTabIcon: {
        width: 50,
        height: 50
    },

    description_container: {
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    text_producto: {
        fontSize: 10,
        fontWeight: 'bold'

    },
    prices_container: {
        alignItems: 'flex-start',
        marginTop: 4,
        flexDirection: 'row'
    },

    prices_container_sub: {
        alignItems: 'flex-start',
        marginTop: 2,
        flexDirection: 'row'
    },
    prices_text: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#558822'
    },
    prices_text_value: {
        fontSize: 15,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#339944'
    },
    precio_real: {
        fontSize: 9,
    },
    descuento_text: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#ff0000'
    },
    descuento_text_value: {
        fontSize: 9,
        color: '#FF0000',
        textDecorationLine: 'line-through'
    },

    btn_container: {
        marginTop: 7,
    },
    counter_container: {
        flex: 1,
        marginTop: 5
    },

    cantidad_text: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#334433'
    },




});