import React from 'react'
import { View, StyleShee, TouchableOpacity, StyleSheet, Text, Image } from 'react-native'
import { COLORS, TYPES_BTN } from '../styles/common_styles'
import ButtonCart from './ButtonCart';


const ItemProducto = ({ producto }) => {

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

    const addToCart = () =>
    {
        console.log(producto);
    }


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
            </View>
            <View style={styles.prices_container}>
                <Text style={styles.prices_text}>Precio ($): </Text>
                <Text style={styles.prices_text_value}>
                    {producto.precio != null ? 
                    producto.precio.format(2, 3, '.', ',') : 0}</Text>
            </View>

            <View style={styles.prices_container}>
                <Text style={styles.descuento_text}>Descuento ($): </Text>

                <Text style={styles.descuento_text_value}>
                    {producto.descuento != null ? 
                    producto.descuento.format(2, 3, '.', ',') : 0}</Text>
               
            </View>
            <View style={styles.btn_container}>
             <ButtonCart onPress={addToCart}></ButtonCart>

            </View>



        </View>


    )
}

export default ItemProducto



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
        width: 65,
        height: 65
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
        marginTop: 5,
        flexDirection: 'row'
    },
    prices_text: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#558822'
    },
    prices_text_value: {
        fontSize: 9,

    },
    descuento_text: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#ff0000'
    },
    descuento_text_value: {
        fontSize: 9,
    },

    btn_container: {
        marginTop: 7,
    }




});