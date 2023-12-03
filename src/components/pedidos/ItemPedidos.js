import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { getProductosPedidosByIdFromDB } from '../../databases/Entity/PedidosEntity';
import { insertProductIntoCartSession } from '../../databases/Entity/CartSessionEntity';
import { showMessage, hideMessage } from "react-native-flash-message";
import { AppContext } from '../../Context/ContextApp';
import { getStockCampaignProductoAll } from '../../databases/Entity/StockCampaignProductoEntity';

const ItemPedidos = ({id_pedido, number, cliente, idcliente, fecha, status, localidad, setIsLoading, setReload, reload}) => {

    const [isLogin, setIsLogin, user, setUser, campaignActive, setCampaignActive,  idcamion, setIdcamion, 
        clientePedido, setClientePedido, pedido, setPedido, isPedido, setIsPedido] = React.useContext(AppContext);


    const [isOnPress,setIsOnPress] = useState(false);

    const [fechaInicio, setFechaInicio] = useState();

    const [estado, setEstado] = useState();

    const navigation = useNavigation();

    const [productos, setProductos] = useState(null);


    const onPressIn = () => {
        
        setIsOnPress(true);
    }

    const onPressOut = () => {
        
        setIsOnPress(false);
    }


    const getProductos = async () => {

        const prod_pedidos = await getProductosPedidosByIdFromDB(id_pedido);
       
        if(prod_pedidos){

           let prod = [];
            for (let i = 0; i < prod_pedidos.rows.length; i++)
            {
                //inserto al carrito
                let producto_ = prod_pedidos.rows.item(i);
                /*const res_save = await insertProductIntoCartSession(producto.idproductos, producto.cantidad, 
                    producto.precio, producto.descuento);*/
                
                prod.push(producto_);

            }
            setProductos(prod);

               //inserto el cliente y el numde pedido al context
            setClientePedido(idcliente);
            setPedido(id_pedido);
            setIsPedido(true);
            //setReload(!reload);


        }
        
     
    }



    const venderPedido = () => {


        Alert.alert('Pedidos', '¿Desea Vender el Pedido?', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Aceptar', onPress: async () => {

                    setIsLoading(true);

                    getProductosAndInsertToCart();
                  
                

                    setTimeout(() => {


    
                        navigation.navigate('CartSessionInicioScreen', {
                            idpedido : id_pedido,
                            idcliente: idcliente
                        });

                        setIsLoading(false);
                        showMessage({
                            message: "El Pedido se ha cargado con éxito!",
                            type: "success",
                            icon: "success"
                        });

                    }, 3000)


                }
            },
        ]);

        //recorroe los productos y agrego al carrito
    

       

        /*navigation.navigate('CartSessionInicioScreen', {
            idpedido : id_pedido
        });*/
    }

    const viewProducts = async () => {

        //getProductos();
        const stock_producto = await getStockCampaignProductoAll();

        if(stock_producto.rows.length <= 0){
            
            showMessage({
                message: "Para ver los Productos del Pedido debe sincronizar el Stock del Camión!",
                type: "danger",
                icon: "danger",
                duration: 4000
            });

        } else {
            navigation.navigate('PedidosResumenProductosScreen', {
                idpedido : id_pedido,
                idcliente: idcliente,
                productos : productos
            });
        }
    }


    useEffect(() => {

        const fecha_ini = new Date(fecha);
        //console.log(fecha_ini.toLocaleDateString());
        setFechaInicio(fecha_ini.toLocaleDateString());

        if(status == 0){
            setEstado('Pedido');
        } else if (status == 1){
            setEstado('Vendido');
        }

    });

    return (
        <TouchableOpacity onPress={status == 0 ? viewProducts : null} onPressIn={status == 0 ? onPressIn : null} onPressOut={status == 0 ? onPressOut : null}>
        <View style={styles.container}>
            <View style={[styles.sub_container, isOnPress ? styles.backgroundcolorPress : styles.backgroundcolor]}>
                <View style={styles.box_icon}>
                    <Image source={require('../../images/pedido.png')} style={styles.icon} />
                </View>
                <View style={styles.box_text_content}>
                    <View style={styles.box_text_sub_content}>
                        <Text style={styles.text_campaign}>Pedido N°: </Text>
                        <Text style={styles.text_details}>{number != undefined ? (number) : null}</Text>
                    </View>
                    <View style={styles.box_text_sub_content}>
                        <Text style={styles.text_campaign}>Fecha: </Text>
                        <Text style={styles.text_details}>{fechaInicio != undefined ? (fechaInicio) : null}</Text>
                    </View>

                    <View style={styles.box_text_sub_content}>
                        <Text style={styles.text_campaign}>Cliente: </Text>
                        <Text style={styles.text_details}>{cliente != undefined ? (cliente) : null}</Text>
                    </View>

                    <View style={styles.box_text_sub_content}>
                        <Text style={styles.text_campaign}>Localidad: </Text>
                        <Text style={styles.text_details}>{localidad != undefined ? (localidad) : null}</Text>
                    </View>

                    <View style={styles.box_text_sub_content}>
                        <Text style={styles.text_estado}>Estado: </Text>
                        <Text style={status == 0 ? styles.text_details_estado : styles.text_details_estado_vendido}>{estado != undefined ? (estado) : null}</Text>
                    </View>


                </View>
            </View>

        </View>
    </TouchableOpacity>
    )
}

export default ItemPedidos

const styles = StyleSheet.create({

    container: {
        height: 125,
        marginTop: 10,
        padding: 5

    },
    sub_container: {
        flexDirection: 'row',
        flex: 1,
       
        borderBottomColor: '#cdcdcd',
        borderTopColor: '#cdcdcd',
        borderLeftColor: '#cdcdcd',
        borderRightColor: '#cdcdcd',
        borderBottomWidth: 1.2,
        borderTopWidth: 1.2,
        borderLeftWidth: 1.2,
        borderRightWidth: 1.2,
        justifyContent: 'flex-start'
    },
    backgroundcolor: {
        backgroundColor: '#efefef',
    },
    backgroundcolorPress: {
        backgroundColor: '#6ee7b7',
    },
    box_icon: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',

    },
    icon: {
        width: 50,
        height: 50
    },

    box_text_content: {
        padding: 1,
        flexDirection: 'column',
        fontFamily: 'Roboto',
        justifyContent: 'center',
        flex: 1

    },

    box_text_sub_content: {
        flexDirection: 'row',
    },

    box_text_sub_content_error: {
        flexDirection: 'column',
    },

    text_campaign: {
        marginBottom: 5,
        fontFamily: 'serif',
        fontSize: 11,
        fontWeight: 'bold'
    },
    text_details: {
        marginBottom: 5,
        fontFamily: 'serif',
        fontSize: 11,
    },

    text_estado: {
        marginBottom: 5,
        fontFamily: 'serif',
        fontSize: 11,
        fontWeight: 'bold',
        paddingTop: 3
    },

    text_details_estado: {
        marginBottom: 5,
        fontFamily: 'serif',
        fontSize: 11,
        backgroundColor: '#ffff00',
        padding: 3
    },
    text_details_estado_vendido: {
        marginBottom: 5,
        fontFamily: 'serif',
        fontSize: 11,
        backgroundColor: '#00ff00',
        padding: 3
    },

});