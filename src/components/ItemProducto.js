import React, { useContext, useEffect, useState } from 'react'
import { View, StyleShee, TouchableOpacity, StyleSheet, Text, Image, Alert } from 'react-native'
import { COLORS, TYPES_BTN } from '../styles/common_styles'
import ButtonCart from './ButtonCart';
import { insertProductIntoCartSession } from '../databases/Entity/CartSessionEntity';
import { showMessage, hideMessage } from "react-native-flash-message";
import Counter from './Counter';
import NumericInput from 'react-native-numeric-input'
import { AppContext } from '../Context/ContextApp';





const ItemProducto = ({ producto, setIsLoading }) => {


    const [isLogin, setIsLogin, user, setUser, campaignActive, setCampaignActive] = React.useContext(AppContext);

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

    const [numberProductos, setNumberProductos] = useState();



    const addToCart = async () => {

        if(numberProductos > 0){
            setIsLoading(true);

            const res_save = await insertProductIntoCartSession(producto.idproductos, numberProductos, 
                producto.precio, producto.descuento);
    
    
            setTimeout(() => {
                setIsLoading(false);
                showMessage({
                    message: "El Producto se agrego con éxito!",
                    type: "success",
                    icon: "success"
                });
    
                /*Alert.alert('Información', 'El producto se agrego con exito', [
          
                    {
                        text: 'Aceptar', onPress: async () => {
                        }}]);*/
            }, 3000)

        } else {
            showMessage({
                message: "La Cantidad debe ser mayor a 0!",
                type: "danger",
                icon: "danger"
            });
        }

       

    }



    useEffect(() => {
        console.log(numberProductos);
       
      
    })


    return (

        <View style={styles.container}>
            <View style={styles.label_container}>
            <Text style={[styles.label_stock]}>{'Stock (' +  producto.cantidad + ')'}</Text>

                <Text style={[styles.label_category, {
                    backgroundColor:
                        producto.color
                }]}>{producto.cat_name}</Text>
            </View>
            <View style={styles.image_container}>
                <Image source={{ uri: 'data:image/*;base64,' + producto.image }} style={styles.imageproduct} />
            </View>

            <View style={styles.description_container}>
                <Text style={styles.text_producto}>{producto.name + ' (' +
                    producto.marca + ')'}</Text>
            </View>
            <View style={styles.prices_container}>

                <Text style={styles.prices_text_value}>$
                    {producto.precio != null ?
                        (producto.precio - producto.descuento).format(2, 3, '.', ',') : 0}</Text>
            </View>

            <View style={styles.prices_container_sub}>


                <Text style={styles.precio_real}> $
                    {producto.precio != null ?
                        producto.precio.format(2, 3, '.', ',') : 0}</Text>

            </View>

            <View style={styles.prices_container_sub}>

                <Text style={styles.descuento_text_value}> $
                    {producto.descuento != null ?
                        producto.descuento.format(2, 3, '.', ',') : 0}</Text>

            </View>
            <View style={styles.counter_container}>
                    
                <NumericInput type='plus-minus' onChange={value => setNumberProductos(value)} 
                 totalWidth={101} 
                 totalHeight={25}
                 maxValue={producto.cantidad} 
                 iconSize={25}
                 rightButtonBackgroundColor='#BCBCBC' 
                 leftButtonBackgroundColor='#DCDCDC'/>
            </View>

            {campaignActive != null ?  <View style={styles.btn_container}>
                <ButtonCart onPress={addToCart}></ButtonCart>

            </View> : null}

           



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
        padding: 2,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    label_category: {
        alignSelf: 'flex-end',
        padding: 2,
        fontSize: 8,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        color: '#ffffff',
    },

    label_stock: {
        alignSelf: 'flex-start',
        padding: 2,
        fontSize: 8,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        fontWeight: 'bold'
    },
    image_container: {
        padding: 3,
        alignContent: 'center',
        alignItems: 'center',
    },
    imageproduct: {
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
        marginTop: 5,
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
        marginTop: 5,
        justifyContent: 'flex-end'
    },
  


});