import React, { useContext, useEffect, useState } from 'react'
import { View, StyleShee, TouchableOpacity, StyleSheet, Text, Image, Alert } from 'react-native'
import { AppContext } from '../../Context/ContextApp';
import { showMessage, hideMessage } from "react-native-flash-message";
import NumericInput from 'react-native-numeric-input'
import ButtonView from '../ButtonView';
import { COLORS, TYPES_BTN } from '../../styles/common_styles';
import { uploadTransferProductoCamion } from '../../services/fetching';

const ItemProductoTranfer = ({ producto, setIsLoading, idcampaign, idcampaing_stock_camion, camion_origen, camion_destino, reload, setReload }) => {

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


    const [numberProductos, setNumberProductos] = useState(0);
    const [stock, setStock] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [solicitado, setSolicitado] = useState(0);

    const sendTranfer = async () => {

        if (numberProductos <= 0) {
            showMessage({
                message: "La Cantidad debe ser mayor a 0 (cero)",
                type: "danger",
                icon: "danger"
            });

        } else if (disponible <= 0) {
            showMessage({
                message: "La Cantidad disponible es Stock debe ser mayor a 0 (cero)",
                type: "danger",
                icon: "danger"
            });
        }
        
        else {

            //armo los datos y envio ala API
            setIsLoading(true);

            let idproducto = producto.idproductos;

            let idstock_campaign_producto = producto.stock_campaign_producto.idstock_campaign_producto;

            let resul = await uploadTransferProductoCamion(idcampaign, camion_origen, camion_destino, idstock_campaign_producto, idcampaing_stock_camion,
                idproducto, numberProductos);


            //actualizo el stock local



            setTimeout(() => {
                if (resul) {
                    let rel = !reload;
                    setReload(rel)
                }
                setIsLoading(false);
                showMessage({
                    message: "La Transferencia fue exitoso!",
                    type: "success",
                    icon: "success"
                });

            }, 3000);

        }




    }

    useEffect(() => {
        console.log(producto.stock_campaign_producto.cantidad);
        setDisponible(producto.stock_campaign_producto.cantidad);
    })


    return (
        <View style={styles.container}>
            <View style={styles.label_container}>
                <Text style={[styles.label_category, {
                    backgroundColor:
                        producto.category.color
                }]}>{producto.category.name}</Text>
            </View>

            <View style={styles.image_container}>
                <Image source={{ uri: 'data:image/*;base64,' + producto.image }} style={styles.imageproduct} />
            </View>

            <View style={styles.description_container}>
                <Text style={styles.text_producto}>{producto.name + ' (' +
                    producto.marca + ')'}</Text>
            </View>


            <View style={styles.description_container}>
                <Text style={styles.text_solicitado}>{'Stock del Camión (' +
                    disponible + ')'}</Text>
            </View>




            <View style={styles.counter_container}>

                <NumericInput type='plus-minus' onChange={value => setNumberProductos(value)}
                    maxValue={disponible}
                    minValue={0}
                    totalWidth={100}
                    totalHeight={25}
                    iconSize={25}
                    rightButtonBackgroundColor='#BCBCBC'
                    leftButtonBackgroundColor='#DCDCDC' />

            </View>

            <View style={styles.btn_stock}>
                <ButtonView onPress={sendTranfer} text={'Transferir'} type={TYPES_BTN.WARNING} icon_={'transferir'}></ButtonView>



            </View>



        </View>
    )
}

export default ItemProductoTranfer

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
        fontSize: 8,
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
    text_disponible: {
        fontSize: 10,
        color: COLORS.SUCCESS,
        fontWeight: 'bold'

    },
    text_solicitado: {
        fontSize: 10,
        color: COLORS.PRIMARY,
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

    btn_stock: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -2,
    },
    btn_stock_eliminar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -5,
    },



});