import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, Alert } from 'react-native'
import ButtonView from './ButtonView';
import { COLORS, TYPES_BTN } from '../styles/common_styles';
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../Context/ContextApp';
import { getProductosStockFetch } from '../services/fetching';

import { LoadingModal } from "react-native-loading-modal";
import { showMessage, hideMessage } from "react-native-flash-message";
import { deleteStockCampaignProductoById, getStockCampaignProductoById, insertStockCampaignProductoToDB, updateStockCampaignProductoToDB } from '../databases/Entity/StockCampaignProductoEntity';
import { responsiveFontSizes } from '@mui/material';

const CamionesCardInformation = ({ camion }) => {

    const navigation = useNavigation();
    const [nombre, setNombre] = useState();
    const [marca, setMarca] = useState();
    const [matricula, setMatricula] = useState();
    const [idstock_camion_campaign, setIdstock_camion_campaign] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [isLogin, setIsLogin, user, setUser, campaignActive, setCampaignActive] = React.useContext(AppContext);
    const [dataProducto, setDataProducto] = useState();


    const getProductosAprobados = async () => {

       
        const productos = await getProductosStockFetch(campaignActive.idcampaign, idstock_camion_campaign);
       
        setDataProducto(productos);
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

    const insertProductoStockToDB = async (producto_stock) => {

        let data = {
            idstock_campaign_producto : producto_stock.stock_campaign_producto.idstock_campaign_producto,
            productos_idproductos : producto_stock.stock_campaign_producto.productos_idproductos,
            stock_camion_campaign_idstock_camion_campaign : producto_stock.stock_campaign_producto.stock_camion_campaign_idstock_camion_campaign,
            cantidad :  producto_stock.stock_campaign_producto.cantidad - producto_stock.transferido_no_ap,
            cantidad_initial : producto_stock.stock_campaign_producto.cantidad_initial,
            created : producto_stock.stock_campaign_producto.created,
            modified : producto_stock.stock_campaign_producto.modified,
            status : producto_stock.stock_campaign_producto.status,
            cant_transfer: producto_stock.stock_campaign_producto.cant_transfer
        }

        let resul = await insertStockCampaignProductoToDB(data);

        return resul;
    }

    const updateProductoStockDB = async (producto_stock) => {

        let data = {
            idstock_campaign_producto : producto_stock.stock_campaign_producto.idstock_campaign_producto,
            cantidad : producto_stock.stock_campaign_producto.cantidad - producto_stock.transferido_no_ap,
            modified : producto_stock.stock_campaign_producto.modified,
            cant_transfer: producto_stock.stock_campaign_producto.cant_transfer
        }

        let resul = await updateStockCampaignProductoToDB(data);
        console.log(resul);

        return resul;

    }

    const eliminarProductoStockDB = async () => {
 
        let resul = await deleteStockCampaignProductoById(idstock_camion_campaign);
        return resul;

    }




    const createCard = () => {

        if (camion != null) {

            setNombre(camion.rows.item(0).nombre);
            setMarca(camion.rows.item(0).marca);
            setMatricula(camion.rows.item(0).matricula);
            setIdstock_camion_campaign(camion.rows.item(0).idstock_camion_campaign);
        }
    }


    const verStock = () => {

        //se va a otra pantalla y solo muestra
        navigation.navigate('StockInicioScreen', {
            idcampaign: campaignActive.idcampaign,
            idcammioncampaign: idstock_camion_campaign
        });

    }


    const cargarStock = () => {
        navigation.navigate('StockCargaInicioScreen', {
            idcampaign: campaignActive.idcampaign,
            idcammioncampaign: idstock_camion_campaign
        });
    }

    const verSolicitudStock = () => {
        navigation.navigate('StockCargaSolicitudesScreen', {
            idcampaign: campaignActive.idcampaign,
            idcammioncampaign: idstock_camion_campaign
        });
    }





    const sincronizarStock = async () => {


        Alert.alert('Stock', '¿Desea descargar el Stock al Móvil?', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Aceptar', onPress: async () => {

                   
                    setIsLoading(true);

                    //Para sincronizar verifico que no haya ventaspendiente de enviar


                    let productos = await getProductosAprobados();
                    let res_eliminar = await eliminarProductoStockDB();

                    if(productos != false && productos != null){

                       console.log('entro aca pues');
                        if (res_eliminar){

                            for (item of productos) {


                                let existe = await getExistProductoStock(item.stock_campaign_producto.idstock_campaign_producto);
                               
                                //console.log('actualizo');
                                if(existe){
                                    //nada
                                    //actualizo los productos
                                    //primero elimino 
                                
                                    let res = updateProductoStockDB(item);
                                    //console.log('actualizo');
                                  
    
                                } else {
                                    //inserto
                                    console.log('no existe, agrego');
                                    let res = insertProductoStockToDB(item);
    
                                    
                                }
                                //console.log(item.stock_campaign_producto.idstock_campaign_producto);
                            
                            }

                        }

                        
                    }
                   

                    setTimeout(() => {

                        setIsLoading(false);
                        showMessage({
                            message: "El Stock se descargó exitosamente!",
                            type: "success",
                            icon: "success"
                        });

                    }, 3000);

                }
            },
        ]);



    }


    useEffect(() => {

        createCard();
        //console.log(campaignActive);


    }, [camion])


    if (camion != null) {

        return (
            <View style={styles.container}>
                  <LoadingModal modalVisible={isLoading} color={'#00ff00'} task={'Cargando....'} />
                <View style={styles.sub_container}>
                    <View style={styles.box_message}>
                        <View style={styles.icon_info}>
                            <View style={styles.sub_icon_info}>
                                <Image source={require('../images/truck.png')} style={styles.icon} />

                            </View>
                        </View>
                        <View style={styles.text_content}>
                            <View style={styles.title_container}>
                                <View style={styles.title_content}>
                                    <Text style={styles.title}>Camión Activo </Text>
                                </View>
                            </View>

                            <View style={styles.details_container}>
                                <View style={styles.text_sub_content}>
                                    <Text style={styles.label_cliente}>Nombre: </Text>
                                    <Text style={styles.text_item}>{nombre}</Text>
                                </View>

                                <View style={styles.text_sub_content}>
                                    <Text style={styles.label_cliente}>Marca: </Text>
                                    <Text style={styles.text_item}>{marca}</Text>
                                </View>

                                <View style={styles.text_sub_content}>
                                    <Text style={styles.label_cliente}>Matrícula: </Text>
                                    <Text style={styles.text_item}>{matricula}</Text>
                                </View>
                                <View style={styles.btn_stock}>
                                    <ButtonView onPress={verStock} text={'Stock'} type={TYPES_BTN.SUCCESS}></ButtonView>

                                </View>
                                <View style={styles.btn_stock}>
                                    <ButtonView onPress={cargarStock} icon_={'edit'} text={'Cargar Stock'} type={TYPES_BTN.WARNING}></ButtonView>

                                </View>

                                <View style={styles.btn_stock}>
                                    <ButtonView onPress={verSolicitudStock} icon_={'ver'} text={'Solicitud de Stock'} type={TYPES_BTN.PRIMARY}></ButtonView>

                                </View>


                            </View>




                        </View>

                    </View>

                </View>
                <View style={styles.sub_container_sync}>
                    <View style={styles.box_message}>
                        <View style={styles.icon_info}>
                            <View style={styles.sub_icon_info}>
                                <Image source={require('../images/sync.png')} style={styles.icon_sync} />

                            </View>
                        </View>
                        <View style={styles.text_content}>
                            <View style={styles.title_container}>
                                <View style={styles.title_content_sync}>
                                    <Text numberOfLines={2} style={styles.title}>Sincronizar Stock al Telefono</Text>
                                </View>
                            </View>

                            <View style={styles.details_container}>

                                <View style={styles.btn_stock}>
                                    <ButtonView onPress={sincronizarStock} icon_={'sync'} text={'Sincronizar Stock'} type={TYPES_BTN.SUCCESS}></ButtonView>

                                </View>


                            </View>




                        </View>

                    </View>

                </View>
            </View>


        )
    } else {

        return (
            <View style={styles.sub_container_error}>
                <View style={styles.box_message}>
                    <View style={styles.icon_info}>
                        <View style={styles.sub_icon_info}>
                            <Image source={require('../images/cancelar.png')} style={styles.icon_error} />

                        </View>
                    </View>
                    <View style={styles.text_content}>
                        <View style={styles.title_container}>
                            <View style={styles.title_content}>
                                <Text style={styles.title_no_campaign}>No Existe Campaña Activa! </Text>
                            </View>
                        </View>

                    </View>

                </View>
            </View>


        )
    }

}

export default CamionesCardInformation

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingLeft: 7,
        paddingRight: 7
    },

    box_message: {
        flex: 1,
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#00000000',

    },

    icon_info: {
        flex: 0.4,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    text_content: {
        flex: 1,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center'

    },
    text_sub_content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderLeftWidth: 0.5,
        paddingLeft: 10,
        marginTop: 5,


    },
    btn_stock: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderLeftWidth: 0.5,
        paddingLeft: 10,
        marginTop: 15,
    },
    label_cliente: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center',
        marginRight: 4,
        flex: 0.3,
        fontSize: 12,
        fontWeight: 'bold',

    },
    text_item: {
        flex: 0.7,
        alignItems: 'center',
        textAlign: 'left',
        fontSize: 12
    },
    title_content: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'

    },
    title_content_sync: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        height: 50

    },
    title_container: {
        flex: 0.2,

    },
    details_container: {
        flex: 0.8,
    },
    title: {

        fontSize: 15,
        color: '#234F1E',
        fontWeight: 'bold',
        

    },
    title_no_campaign: {

        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold'

    },
    icon: {
        width: 90,
        height: 90
    },

    icon_sync: {
        width: 70,
        height: 70
    },

    icon_error: {
        width: 90,
        height: 90,
        tintColor: '#ffffff'
    },

    sub_container: {
        flexDirection: 'column',
        flex: 0.45,
        borderBottomColor: '#b0f2c2',
        borderTopColor: '#b0f2c2',
        borderLeftColor: '#b0f2c2',
        borderRightColor: '#b0f2c2',
        borderBottomWidth: 1.2,
        borderTopWidth: 1.2,
        borderLeftWidth: 1.2,
        borderRightWidth: 1.2,
        backgroundColor: '#b0f2c2',
        marginTop: 10,
        borderRadius: 10,
        elevation: 8,
        shadowColor: '#164620',
        padding: 10
    },
    sub_container_sync: {
        flexDirection: 'column',
        flex: 0.2,
        borderBottomColor: '#ffffff',
        borderTopColor: '#ffffff',
        borderLeftColor: '#ffffff',
        borderRightColor: '#ffffff',
        borderBottomWidth: 1.2,
        borderTopWidth: 1.2,
        borderLeftWidth: 1.2,
        borderRightWidth: 1.2,
        backgroundColor: '#ffffff',
        marginTop: 10,
        borderRadius: 10,
        elevation: 8,
        shadowColor: '#164620',
        padding: 10
    },
    sub_container_error: {
        flexDirection: 'column',
        flex: 0.2,
        borderBottomColor: '#ff0000',
        borderTopColor: '#ff0000',
        borderLeftColor: '#ff0000',
        borderRightColor: '#ff0000',
        borderBottomWidth: 1.2,
        borderTopWidth: 1.2,
        borderLeftWidth: 1.2,
        borderRightWidth: 1.2,
        backgroundColor: '#d34240',
        margin: 10,
        marginTop: 10,
        borderRadius: 10,
        elevation: 8,
        shadowColor: '#164620',
        padding: 10,
    },
});