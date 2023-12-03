import React, { useContext, useEffect, useState } from 'react'
import { View, StyleShee, TouchableOpacity, StyleSheet, Text, Image, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ButtonView from '../ButtonView';
import { COLORS, TYPES_BTN } from '../../styles/common_styles';
import { getProductosVentasById, getProductosVentasByIdNotProd } from '../../databases/Entity/ProductosVentasEntity';
import { addVentaFetch } from '../../services/fetching';
import { LoadingModal } from "react-native-loading-modal";
import { updateVentaStatusDB } from '../../databases/Entity/VentasEntity';

import { showMessage, hideMessage } from "react-native-flash-message";



const VentasRealizadasItem = ({venta, sent, reload, setReload}) => {

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

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


    const verVenta = () => {
        navigation.navigate('VentasResumenScreen', 
        {
            venta : venta
        });
    }

    const enviar = async () => {


        const prod_ventas = await getProductosVentasByIdNotProd(venta.ventas_id);

        let productos = []; 
        for(let j = 0; j < prod_ventas.rows.length; j++){

            productos.push(prod_ventas.rows.item(j));

        }

        //console.log(productos);


        let venta_ = {
            users_idusers : venta.users_idusers,
            clientes_idclientes : venta.clientes_idclientes, 
            subtotal : venta.subtotal,
            descuentos : venta.descuentos,
            total : venta.total,
            descuento_general : venta.descuento_general,
            coordenadas: venta.coordenadas,
            campaign_idcampaign : venta.campaign_idcampaign,
            cuenta_corriente : venta.cuenta_corriente,
            is_pay: venta.is_pay,
            camion_idcamion : venta.camion_idcamion,
            productos: productos,
            pedidos_idpedidos: venta.pedidos_idpedidos,
        }



        Alert.alert('Envio', '¿Desea Enviar la Venta?', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Aceptar', onPress: async () => {

                    setIsLoading(true);
                    
                    const res = await addVentaFetch(venta_);
                    console.log(res);
                   
                    //setIsLoading(false);
       
                    if(res != false && !isNaN(res)){
                        //cambio elestado de la venta
                        const result = await updateVentaStatusDB(1, venta.ventas_id, res);

            
                        if(true){

                            setTimeout(() => {

                                setIsLoading(false);
                                showMessage({
                                    message: "La Venta se ha enviado con éxito!",
                                    type: "success",
                                    icon: "success"
                                });
                                setReload(!reload);
        
                            }, 3000)
            
                        } else {
                            setTimeout(() => {

                                setIsLoading(false);
                                showMessage({
                                    message: "Error. Intente nuevamente!",
                                    type: "danger",
                                    icon: "danger"
                                });
        
                            }, 3000)
                        }
            
                    } else {

                        if(res != false){
                            setTimeout(() => {

                                setIsLoading(false);
                                const myJSON = JSON.stringify(res);
                                showMessage({
                                    message: myJSON,
                                   
                                    type: "danger",
                                    icon: "danger"
                                });
        
                            }, 3000)

                        } else {
                            setTimeout(() => {

                                setIsLoading(false);
                                showMessage({
                                    message: "Error. No se puede sincronizar la venta!",
                                    type: "danger",
                                    icon: "danger"
                                });
        
                            }, 3000)
                        }
                      
                    } 
                   

            
                }
            },
        ]);

      
       
    
        setIsLoading(false);

    }

    useEffect(() => {

    })


    return (
        <View style={styles.container}>
             <LoadingModal modalVisible={isLoading} color={'#00ff00'} title={'Cargando....'} />
            <View style={styles.label_container}>
                <Text style={[styles.label_category, {
                    backgroundColor:
                    venta.status == 1 ? COLORS.SUCCESS : COLORS.DANGER
                }]}>{venta.status == 1 ? 'Enviado' : 'No Enviado'}</Text>
            </View>

            <View style={styles.image_container}>
            {venta.is_pay == 1 ? <Image source={require('../../images/ventas.png')} style={styles.imageproduct} /> : 
            <Image source={require('../../images/tarjeta.png')} style={styles.imageproduct} />}
                
            </View>

            <View style={styles.description_container}>
                <Text style={styles.text_producto}>{'Venta ID: '}</Text><Text style={styles.text_producto_nb}>{venta.ventas_id}</Text>
            </View>
          
            <View style={styles.description_container}>
                <Text style={styles.text_producto}>{'Cliente: '}</Text><Text style={styles.text_producto_nb}>{venta.shop_name}</Text>
            </View>

            <View style={styles.description_container}>
                <Text style={styles.text_subtotal}>{'Subtotal ($): '}</Text>
                <Text style={styles.text_producto_nb_otro}> {venta.subtotal != null ?
                                venta.subtotal.format(2, 3, '.', ',') : 0}</Text>
            </View>


            <View style={styles.description_container}>
                <Text style={styles.descuento_text}>{'Desc. ($): '}</Text>
                <Text style={styles.text_producto_nb_otro}> {venta.descuentos != null ?
                                venta.descuentos.format(2, 3, '.', ',') : 0}</Text>
            </View>

            <View style={styles.description_container}>
                <Text style={styles.descuento_text}>{'O. Desc. ($): '}</Text>
                <Text style={styles.text_producto_nb_otro}> {venta.descuento_general != null ?
                                venta.descuento_general.format(2, 3, '.', ',') : 0}</Text>
            </View>


            <View style={styles.description_container}>
                <Text style={styles.total_text}>{'Total ($): '}</Text>
                <Text style={styles.text_producto_nb_otro}> {venta.total != null ?
                                venta.total.format(2, 3, '.', ',') : 0}</Text>
            </View>





            <View style={styles.btn_stock}>
                {!sent ? <ButtonView onPress={verVenta} text={'Ver'} type={TYPES_BTN.PRIMARY} icon_={'ver'}></ButtonView> : 
                <ButtonView onPress={enviar} text={'Enviar'} type={TYPES_BTN.SUCCESS} icon_={'enviar'}></ButtonView> }

            </View>



        </View>
    )
}

export default VentasRealizadasItem


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
        marginTop: 5,
        flexDirection: 'row'
    },
    text_producto: {
        fontSize: 10,
        fontWeight: 'bold'

    },
    text_producto_nb: {
        fontSize: 9,
        maxWidth: '65%'

    },
    text_producto_nb_otro: {
        fontSize: 9,
        maxWidth: '48%'

    },
    text_disponible: {
        fontSize: 10,
        color: COLORS.SUCCESS,
        fontWeight: 'bold'

    },
    text_subtotal: {
        fontSize: 9,
        color: '#339933',
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
        fontSize: 8,
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

    total_text: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#0000ff'
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