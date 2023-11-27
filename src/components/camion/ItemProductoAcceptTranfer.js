import React, { useContext, useEffect, useState } from 'react'
import { View, StyleShee, TouchableOpacity, StyleSheet, Text, Image, Alert } from 'react-native'
import { AppContext } from '../../Context/ContextApp';
import { showMessage, hideMessage } from "react-native-flash-message";
import NumericInput from 'react-native-numeric-input'
import ButtonView from '../ButtonView';
import { COLORS, TYPES_BTN } from '../../styles/common_styles';
import { acceptTransferCamionFetch, deleteProductosTransferenciasByCamionFetch, getProductosStockFetch } from '../../services/fetching';

import { useNavigation } from '@react-navigation/native'
import { getStockCampaignProductoById, insertStockCampaignProductoToDB, updateStockCampaignProductoToDB } from '../../databases/Entity/StockCampaignProductoEntity';

const ItemProductoAcceptTranfer = ({ producto_tranfer, setIsLoading, idcampaign, reload, setReload, hasButtons, has_delete }) => {
    const [isLogin, setIsLogin, user, setUser, campaignActive, setCampaignActive] = React.useContext(AppContext);
    const navigation = useNavigation();

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

    const [producto, setProducto] = useState();


    const editTransferencia = () => {

        //esto va a otro screen que modifica el total y envia
        navigation.navigate('CamionesEditProductoTransferScreen', {
            producto_tranfer
        });



    }

    const acceptTransfer = async () => {

        //necesito 6 variables para aceptar la transferencia
        /* $idtransferencia_stock = $this->request->getData('idtransferencia_stock');
            $idstock_campaign_producto = $this->request->getData('idstock_campaign_producto');
            $cantidad = $this->request->getData('cantidad');
            $idcamion = $this->request->getData('idcamion');
            $idcampaign = $this->request->getData('idcampaign');
            $productos_idproductos = $this->request->getData('productos_idproductos');*/
        //idcamion se corresponde con el camion de destino, o sea el actual camion


        Alert.alert('Consulta', '¿Acepta la Transferencia del Producto?', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Aceptar', onPress: async () => {

                    let idtransferencia_stock = producto_tranfer.idtransferencia_stock;
                    let idstock_campaign_producto = producto_tranfer.idstock_campaign_producto;
                    let cantidad = producto_tranfer.cantidad;
                    let idcamion = producto_tranfer.camion_destino;
                    let idcampaign = producto_tranfer.idcampaign;
                    let productos_idproductos = producto_tranfer.productos_idproductos;

                    setIsLoading(true);
                    const resul = await acceptTransferCamionFetch(idtransferencia_stock, idstock_campaign_producto, cantidad, idcamion, idcampaign, productos_idproductos)

                    //actualizo el stock local



                    setTimeout(() => {

                        if (resul) {

                            let rel = !reload;
                            setReload(rel)
                        }

                        setIsLoading(false);
                        showMessage({
                            message: "El Producto fue aceptado exitosamente!",
                            type: "success",
                            icon: "success"
                        });

                    }, 3000);

                }
            },
        ]);


    }


    const deleteTransfer = async () => {

        Alert.alert('Consulta', '¿Desea Eliminar la Transferencia del Producto?', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Aceptar', onPress: async () => {

                
                    setIsLoading(true);
                    const resul = await deleteProductosTransferenciasByCamionFetch(producto_tranfer.idtransferencia_stock, producto_tranfer.idstock_campaign_producto);
                    //actualizo el stock local
                    const productos_aprob = await getProductosAprobados();

                    if(productos_aprob != false && productos_aprob != null){

                        for (item of productos_aprob) {


                            let existe = await getExistProductoStock(item.stock_campaign_producto.idstock_campaign_producto);
                           
                            //console.log('actualizo');
                            if(existe){
                                //nada
                                //actualizo los productos
                                //primero elimino 
                            
                                let res = updateProductoStockDB(item);
                                console.log('actualizo');
                              
                            } else {
                                //inserto
                                console.log('no existe, agrego');
                                let res = insertProductoStockToDB(item);
        
                                
                            }
                            //console.log(item.stock_campaign_producto.idstock_campaign_producto);
                        
                        }

                    }
                   

                    setTimeout(() => {

                        if (resul) {

                            let rel = !reload;

                            setReload(rel)
                        }

                        setIsLoading(false);
                        showMessage({
                            message: "El Producto fue eliminado exitosamente!",
                            type: "success",
                            icon: "success"
                        });

                    }, 3000);

                }
            },
        ]);


    }

    const getProductosAprobados = async () => {

       /*console.log('variables');
        console.log(campaignActive.idcampaign);
        console.log(producto_tranfer.idstock_campaign_producto);*/
        const productos = await getProductosStockFetch(campaignActive.idcampaign, producto_tranfer.idstock_camion_campaign);
       
       
        //setDataProducto(productos);
        //setDataProductoDinamic(productos);
   
        return productos;
    }

    const getExistProductoStock = async (idstock_campaign_producto) => {

        const res = await getStockCampaignProductoById(idstock_campaign_producto);
        //console.log(res);
        if (res != false)
        {
           
            if(res.rows.length > 0){
                return true;
            }
            
        }
        return false;

    }

    const updateProductoStockDB = async (producto_stock) => {

        let data = {
            idstock_campaign_producto : producto_stock.stock_campaign_producto.idstock_campaign_producto,
            cantidad : producto_stock.stock_campaign_producto.cantidad,
            modified : producto_stock.stock_campaign_producto.modified,
            cant_transfer: producto_stock.stock_campaign_producto.cant_transfer
        }

        let resul = await updateStockCampaignProductoToDB(data);
        //console.log(resul);

        return resul;

    }

    const insertProductoStockToDB = async (producto_stock) => {

        let data = {
            idstock_campaign_producto : producto_stock.stock_campaign_producto.idstock_campaign_producto,
            productos_idproductos : producto_stock.stock_campaign_producto.productos_idproductos,
            stock_camion_campaign_idstock_camion_campaign : producto_stock.stock_campaign_producto.stock_camion_campaign_idstock_camion_campaign,
            cantidad : producto_stock.stock_campaign_producto.cantidad,
            cantidad_initial : producto_stock.stock_campaign_producto.cantidad_initial,
            created : producto_stock.stock_campaign_producto.created,
            modified : producto_stock.stock_campaign_producto.modified,
            status : producto_stock.stock_campaign_producto.status,
            cant_transfer: producto_stock.stock_campaign_producto.cant_transfer
        }

        let resul = await insertStockCampaignProductoToDB(data);

        return resul;
    }



    useEffect(() => {

        setProducto(producto_tranfer.producto);

    }, [reload])

    return (
        <View style={styles.container}>



            <View style={styles.label_container}>

                <Text style={[styles.label_category, {
                    backgroundColor: producto_tranfer.status == 0 ? COLORS.WARNING : COLORS.SUCCESS
                }]}>{producto_tranfer.status == 0 ? 'Pendiente' : 'Aprobado'}</Text>
            </View>

            <View style={styles.description_container}>
                <Text style={styles.text_producto}>{'Origen: ' + producto_tranfer.camion_origen.nombre}</Text>
            </View>


            <View style={styles.image_container}>
                <Image source={{ uri: 'data:image/*;base64,' + producto_tranfer.producto.image }} style={styles.imageproduct} />
            </View>

            <View style={styles.description_container}>
                <Text style={styles.text_producto}>{producto_tranfer.producto.name + ' (' +
                    producto_tranfer.producto.marca + ')'}</Text>
            </View>


            <View style={styles.description_container}>
                <Text style={styles.text_solicitado}>{'Cantidad (' + producto_tranfer.cantidad
                    + ')'}</Text>
            </View>

            {hasButtons != false ?

                <View style={styles.btn_stock}>
                    <ButtonView onPress={editTransferencia} text={'Editar'} type={TYPES_BTN.WARNING} icon_={'edit'}></ButtonView>

                </View>
                : null}

            {hasButtons != false ?
                <View style={styles.btn_stock}>
                    <ButtonView onPress={acceptTransfer} text={'Aceptar'} type={TYPES_BTN.PRIMARY} icon_={'seleccionar'}></ButtonView>

                </View>
                : null}
            {producto_tranfer.status == 0 ? 
            has_delete != false ?
                <View style={styles.btn_stock}>
                    <ButtonView onPress={deleteTransfer} text={'Eliminar'} type={TYPES_BTN.DANGER} icon_={'eliminar'}></ButtonView>

                </View>
                : null : <View style={styles.btn_stock}>
                <ButtonView onPress={deleteTransfer} text={'Eliminar'} type={TYPES_BTN.DANGER} icon_={'eliminar'} disabled={true}></ButtonView>

            </View> }



        </View>
    )
}

export default ItemProductoAcceptTranfer

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