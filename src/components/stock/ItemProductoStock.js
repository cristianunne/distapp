import React, { useContext, useEffect, useState } from 'react'
import { View, StyleShee, TouchableOpacity, StyleSheet, Text, Image, Alert } from 'react-native'
import { AppContext } from '../../Context/ContextApp';
import NumericInput from 'react-native-numeric-input'
import { COLORS, TYPES_BTN } from '../../styles/common_styles';
import ButtonView from '../ButtonView';
import { addProductoToCamionStock, deleteProductoSolicitudesStock, editProductoSolicitudesStock } from '../../services/fetching';
import { showMessage, hideMessage } from "react-native-flash-message";

const ItemProductoStock = ({ producto, setIsLoading, idstockcamioncampaign, reload, setReload, funcion }) => {

    //si funcion == 1 SENT, si funcion == 2 edit

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


    const sentStock = async () => {

        //envio a la base y luego elimino de aca
        if (numberProductos > 0) {

            setIsLoading(true);

            //necesito las siguientes variabls
            let idproducto = producto.idproductos;
            //let idcampaign = campaignActive.idcampaign;

            const resul = await addProductoToCamionStock(idproducto, idstockcamioncampaign, numberProductos);


            setTimeout(() => {
                if (resul) {
                    let rel = !reload;
                    setReload(rel)
                }
                setIsLoading(false);
                showMessage({
                    message: "El Pedido de Stock fue enviado exitosamente!",
                    type: "success",
                    icon: "success"
                });

            }, 3000);


        }


    }


    const editStockSolicitud = async () => {

        if (numberProductos > 0) {

            //NECESITO idstock_campaign_producto
            let idstock_campaign_producto = producto.stock_campaign_producto.idstock_campaign_producto;

            setIsLoading(true);
            const resul = await editProductoSolicitudesStock(idstock_campaign_producto, numberProductos);

            setTimeout(() => {

                if (resul) {

                    let rel = !reload;

                    setReload(rel)
                }

                setIsLoading(false);
                showMessage({
                    message: "El Pedido de Stock fue actualizado exitosamente!",
                    type: "success",
                    icon: "success"
                });

            }, 3000);




        }

    }


    const eliminarStockSolicitud = async () => {

        Alert.alert('Eliminar', '¿Desea Eliminar el Producto?', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Aceptar', onPress: async () => {

                    //NECESITO idstock_campaign_producto
                    let idstock_campaign_producto = producto.stock_campaign_producto.idstock_campaign_producto;
                    setIsLoading(true);
                    const resul = await deleteProductoSolicitudesStock(idstock_campaign_producto);

                    setTimeout(() => {

                        if (resul) {

                            let rel = !reload;

                            setReload(rel)
                        }

                        setIsLoading(false);
                        showMessage({
                            message: "El Pedido de Stock fue eliminado exitosamente!",
                            type: "success",
                            icon: "success"
                        });

                    }, 3000);

                }
            },
        ]);

    }

    useEffect(() => {

        setStock(producto.stock_producto.stock);
        setDisponible(producto.stock_producto.stock - producto.asignado);
        if (funcion != 1) {
            setSolicitado(producto.stock_campaign_producto.cantidad_initial);

        }
        

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
                <Text style={styles.text_producto}>{'Stock General (' +
                    stock + ')'}</Text>
            </View>

            <View style={styles.description_container}>
                <Text style={styles.text_disponible}>{'Disponible (' +
                    disponible + ')'}</Text>
            </View>

            {funcion != 1 ? <View style={styles.description_container}>
                <Text style={styles.text_solicitado}>{funcion == 2 ? 'Solicitado (' +
                    solicitado + ')' : 'Stock del Camión (' +
                    solicitado + ')'}</Text>
            </View> : null}

           


            <View style={styles.counter_container}>
                {funcion != null ? 
                <NumericInput type='plus-minus' onChange={value => setNumberProductos(value)}
                    maxValue={disponible}
                    totalWidth={100}
                    totalHeight={25}
                    iconSize={25}
                    rightButtonBackgroundColor='#BCBCBC'
                    leftButtonBackgroundColor='#DCDCDC' />
                    : null}
            </View> 

            <View style={styles.btn_stock}>
                {funcion == 1 ? <ButtonView onPress={sentStock} text={'Enviar'} type={TYPES_BTN.WARNING} icon_={'enviar'}></ButtonView> :
                    funcion == 2 ? <ButtonView onPress={editStockSolicitud} text={'Editar'} type={TYPES_BTN.PRIMARY} icon_={'edit'}></ButtonView> : null}

            </View>

            <View style={styles.btn_stock_eliminar}>
                {funcion == 2 ? <ButtonView onPress={eliminarStockSolicitud} text={'Eliminar'} type={TYPES_BTN.DANGER} icon_={'eliminar'}></ButtonView> :
                    null}

            </View>


        </View>
    )
}

export default ItemProductoStock

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