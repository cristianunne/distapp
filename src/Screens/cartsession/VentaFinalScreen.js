import React, { useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { MaterialIcons } from '@expo/vector-icons';
import Footer from '../../components/Footer';
import ButtonAction from '../../components/ButtonAction';
import { TYPES_BTN } from '../../styles/common_styles';
import { AppContext } from '../../Context/ContextApp';
import { showMessage, hideMessage } from "react-native-flash-message";
import { insertVentasToDB } from '../../databases/Entity/VentasEntity';
import { insertProductosVentasToDB } from '../../databases/Entity/ProductosVentasEntity';
import { actualizarOnlyStockCampaignProductoToDB } from '../../databases/Entity/StockCampaignProductoEntity';
import { database_name, deleteTables } from '../../databases/databaseServices';
import { deleteProductoFromCartSessionDB } from '../../databases/Entity/CartSessionEntity';
import { delete_cart_session_table } from '../../databases/querysTables';
import * as SQLITE from 'expo-sqlite'
import { LoadingModal } from "react-native-loading-modal";
import { updatePedidoStatus } from '../../databases/Entity/PedidosEntity';




export const VentaFinalScreen = ({ route }) => {

    const [isLogin, setIsLogin, user, setUser, campaignActive, setCampaignActive,  idcamion, setIdcamion, 
        clientePedido, setClientePedido, pedido, setPedido, isPedido, setIsPedido] = React.useContext(AppContext);
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

    const navigation = useNavigation();

    const productos = route.params.productos;
    const cliente = route.params.clientes;
    const descuento_gen = route.params.descuento_general != null ? parseFloat(route.params.descuento_general) : 0;
    const subtotal = route.params.subtotal;
    const descuento_ = route.params.descuento;
    const total = route.params.total - descuento_gen;

    const type_pago = route.params.type_pago;

    const [items, setItems] = useState();

    const items_table = [];

    const createItems = () => {
        let i = 1;
        console.log(productos);
        for (item of productos) {
            let sub_item = [];
            //console.log(item);

            let total = (item.cart_s_cantidad * item.cart_s_precio) - (item.cart_s_cantidad * item.cart_s_descuento);
            //console.log(item.cantidad);
            sub_item.push(<View style={styles.row} key={i}>
                <View style={styles.column_prod}><Text style={styles.text_row_head}>{item.name + ' (' + item.content + ' ' + item.unidad + ')'}</Text></View>
                <View style={styles.column_cantidad}><Text style={styles.text_row_head}>{item.cart_s_cantidad}</Text></View>
                <View style={styles.column_precio}><Text style={styles.text_row_head}>{item.cart_s_precio != null ? item.cart_s_precio.format(2, 3, '.', ',') : 0}</Text></View>
                <View style={styles.column_desc}><Text style={styles.text_row_head}>{item.cart_s_descuento != null ? item.cart_s_descuento.format(2, 3, '.', ',') : 0}</Text></View>
                <View style={styles.column_tot}><Text style={styles.text_row_head}>{total != null ? total.format(2, 3, '.', ',') : 0}</Text></View></View>

            );
            i++;

            items_table.push(sub_item);


        }

        setItems(items_table);
        //console.log(productos);

    }

    const vender = async () => {

        const myobj = JSON.parse(user);

        Alert.alert('Vender', '¿Desea Concretar la Venta?', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Aceptar', onPress: async () => {

                
                    if (campaignActive.idcampaign == null) {

                        showMessage({
                            message: "No existe Campaña activa.",
                            type: "danger",
                            icon: "danger"
                        });
            
                    } else if (idcamion == null) {
                        showMessage({
                            message: "No existe Camion asignado.",
                            type: "danger",
                            icon: "danger"
                        });
                    } else {
                        setIsLoading(true);
            
                        let data = {
                            created: new Date().toLocaleString(),
                            users_idusers: myobj.idusers,
                            clientes_idclientes: cliente.idclientes,
                            subtotal: subtotal,
                            descuentos: descuento_,
                            total: total,
                            descuento_general: descuento_gen,
                            pedidos_idpedidos: isPedido ? pedido : null,
                            coordenadas: null,
                            campaign_idcampaign: campaignActive.idcampaign,
                            cuenta_corriente: type_pago == 2 ? 1 : 0,
                            is_pay: type_pago == 1 ? 1 : 0,
                            camion_idcamion: idcamion,
                            status: 0
                        }
                        //console.log(data);
            
                        const save_venta = await insertVentasToDB(data);
                        console.log(save_venta.insertId);
            
                        if (save_venta != false) {
            
                            //aca guardo los productos
            
                            //let total = (item.cart_s_cantidad * item.cart_s_precio) - (item.cart_s_cantidad * item.cart_s_descuento);
            
                            for (item of productos) {
                                let data_prod = {
                                    ventas_idventas: save_venta.insertId,
                                    productos_idproductos: item.idproductos,
                                    cantidad: item.cart_s_cantidad,
                                    precio_unidad: item.cart_s_precio,
                                    descuento_unidad: item.cart_s_descuento,
                                    created: new Date().toLocaleString(),
                                    idstock_campaign_producto : item.idstock_campaign_producto
                                }
            
                                const res_ = await insertProductosVentasToDB(data_prod);
                                //descuento los stockde productos
                                let idstock_campaign_producto = item.idstock_campaign_producto;
                                let stock = {
                                    cantidad : item.cart_s_cantidad, 
                                    modified: new Date().toLocaleString(), 
                                    idstock_campaign_producto : idstock_campaign_producto
                                }
                                //console.log(stock);
            
                                let res_resta = await actualizarOnlyStockCampaignProductoToDB(stock);


                                //actualizo el pedido a vendido
                                let res_status_ped = await updatePedidoStatus(pedido);

            
                            }
            
                            //limpio el carrito
                            const db = SQLITE.openDatabase(database_name);
                            const clean_cart = await deleteTables(db, delete_cart_session_table);

                            //limpio el context
                            setClientePedido(null);
                            setPedido(null);
                            setIsPedido(false);
            
            
                            setTimeout(() => {
                                setIsLoading(false);
                                showMessage({
                                    message: "La Venta se ha realizado correctamente. Envíe al Servidor!.",
                                    type: "success",
                                    icon: "success"
                                });
            
                                navigation.navigate('Home');
            
                            }, 3000)
            
                        
            
                            //hago un navigate a inicio
            
                        } else {
                            setIsLoading(false);
                            showMessage({
                                message: "No se pudo generar la Venta. Intente nuevamente!.",
                                type: "danger",
                                icon: "danger"
                            });
                        }
            
            
            
                    }

                }
            },
        ]);

      




    }



    useState(() => {
        createItems();

        //let ahora = new Date();
        //console.log(new Date().toLocaleString());

    }, [items]);

    return (
        <View style={styles.container}>
            <Header title={'Realizar Venta'} leftIcon={require('../../images/home.png')}
            />
             <LoadingModal modalVisible={isLoading} color={'#00ff00'} title={'Cargando....'} />

            <View style={styles.sub_container}>
                <View style={styles.box_message}>
                    <View style={styles.icon_info}>
                        <View style={styles.sub_icon_info}>
                            <MaterialIcons name={'people-alt'} size={90
                            } color="green" />
                        </View>
                    </View>
                    <View style={styles.text_content}>
                        <View style={styles.text_sub_content}>
                            <Text style={styles.label_cliente}>Apellido: </Text>
                            <Text style={styles.text_item}>{cliente.apellido}</Text>
                        </View>

                        <View style={styles.text_sub_content}>
                            <Text style={styles.label_cliente}>Nombre: </Text>
                            <Text style={styles.text_item}>{cliente.nombre}</Text>
                        </View>

                        <View style={styles.text_sub_content}>
                            <Text style={styles.label_cliente}>Comercio: </Text>
                            <Text style={styles.text_item}>{cliente.shop_name}</Text>
                        </View>

                        <View style={styles.text_sub_content}>
                            <Text style={styles.label_cliente}>Dirección: </Text>
                            <Text style={styles.text_item}>{cliente.direccion + ' ' + cliente.altura}</Text>
                        </View>

                        <View style={styles.text_sub_content}>
                            <Text style={styles.label_cliente}>Telefono: </Text>
                            <Text style={styles.text_item}>{cliente.telefono}</Text>
                        </View>

                        <View style={styles.text_sub_content}>
                            <Text style={styles.label_cliente}>Localidad: </Text>
                            <Text style={styles.text_item}>{cliente.localidad}</Text>
                        </View>

                    </View>

                </View>
            </View>


            <View style={styles.productos_container}>
                <View style={styles.productos_table_container}>
                    <ScrollView>
                        <View style={styles.table_head}>
                            <View style={styles.column_head_prod}><Text style={styles.text_column_head}>Producto</Text></View>
                            <View style={styles.column_head_cantidad}><Text style={styles.text_column_head}>Cantidad</Text></View>
                            <View style={styles.column_head_precio}><Text style={styles.text_column_head}>Precio</Text></View>
                            <View style={styles.column_head_desc}><Text style={styles.text_column_head}>Descuento</Text></View>
                            <View style={styles.column_head_tot}><Text style={styles.text_column_head}>Total</Text></View>
                        </View>

                        {items}


                    </ScrollView>

                </View>
            </View>

            <View style={styles.box_resumen}>
                <View style={styles.box_sub_resumen_main}>
                    <View style={styles.box_sub_resumen}>
                        <Text style={styles.label}>Subtotal: </Text>
                        <Text style={styles.prices_text_value}>
                            $
                            {subtotal != null ?
                                subtotal.format(2, 3, '.', ',') : 0}
                        </Text>
                    </View>
                    <View style={styles.box_sub_resumen}>
                        <Text style={styles.label}>Descuentos: </Text>
                        <Text style={styles.descuento_text_value}>
                            $
                            {descuento_ != null ?
                                descuento_.format(2, 3, '.', ',') : 0}
                        </Text>

                    </View>

                    <View style={styles.box_sub_resumen}>
                        <Text style={styles.label}>Otros Descuentos: </Text>
                        <Text style={styles.descuento_text_value}>
                            $
                            {descuento_gen != null ?
                                descuento_gen.format(2, 3, '.', ',') : 0}
                        </Text>

                    </View>
                    <View style={styles.box_sub_resumen}>
                        <Text style={styles.label_total}>Total: </Text>
                        <Text style={styles.label_total}>
                            $
                            {total != null ?
                                total.format(2, 3, '.', ',') : 0}
                        </Text>
                    </View>

                    
                </View>

                <View style={styles.box_sub_resumen_main}>
                    <View style={styles.box_btn}>
                        <View style={styles.box_sub_btn}>
                            <ButtonAction title={'Vender'} type={TYPES_BTN.SUCCESS} onPress={vender}></ButtonAction>
                        </View>

                    </View>

                </View>
            </View>

            <Footer></Footer>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed',

    },

    sub_container: {
        flexDirection: 'column',
        flex: 0.23,
        borderBottomColor: '#ededed',
        borderTopColor: '#ededed',
        borderLeftColor: '#ededed',
        borderRightColor: '#ededed',
        borderBottomWidth: 1.2,
        borderTopWidth: 1.2,
        borderLeftWidth: 1.2,
        borderRightWidth: 1.2,
        backgroundColor: '#ffffff',
        marginTop: 10
    },

    box_message: {
        flex: 1,
        borderRadius: 10,
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        paddingBottom: 1,

    },
    icon_info: {
        flex: 0.4,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },

    sub_icon_info: {

    },

    text_content: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 10,
        flexDirection: 'column'

    },
    title: {

    },
    text_sub_content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderLeftWidth: 0.5,
        paddingLeft: 10

    },
    label_cliente: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center',
        marginRight: 4,
        flex: 0.3,
        fontSize: 12,
        fontWeight: 'bold'

    },
    text_item: {
        flex: 0.7,
        alignItems: 'center',
        textAlign: 'left',
        fontSize: 12
    },

    productos_container: {
        flex: 0.57,
        marginTop: 10,
        padding: 5
    },
    productos_table_container: {
        backgroundColor: '#ffffff',
        flex: 1,
        padding: 3

    },
    table_head: {
        height: 32,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#dedede',
    },

    row: {
        height: 32,

        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around'
    },
    column_head: {
        flex: 0.5,
        borderColor: '#444444',
        borderWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',

    },
    column_head_cantidad: {

        borderColor: '#444444',
        borderWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.15
    },
    column_head_tot: {

        borderColor: '#444444',
        borderWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.21
    },
    column_head_prod: {

        borderColor: '#444444',
        borderWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.21
    },
    column_head_precio: {

        borderColor: '#444444',
        borderWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.21
    },
    column_head_desc: {

        borderColor: '#444444',
        borderWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.21
    },



    column_cantidad: {

        borderColor: '#444444',
        borderWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.15
    },
    column_tot: {

        borderColor: '#444444',
        borderWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.21
    },
    column_prod: {

        borderColor: '#444444',
        borderWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.21
    },
    column_precio: {

        borderColor: '#444444',
        borderWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.21
    },
    column_desc: {

        borderColor: '#444444',
        borderWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.21
    },
    text_column_head: {
        fontSize: 11
    },

    text_row_head: {
        fontSize: 9.5
    },
    box_resumen: {
        flex: 0.2,
        backgroundColor: '#ffffff',
        marginBottom: 71,
        padding: 15,
        flexDirection: 'row'

    },
    box_sub_resumen_main: {
        flex: 0.7,
        flexDirection: 'column',
    },

    label: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center',
        fontSize: 13

    },

    label_total: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555555'

    },
    prices_text_value: {
        fontSize: 13,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#339944',
        alignSelf: 'center'
    },
    descuento_text_value: {
        fontSize: 13,
        color: '#FF0000',
        textDecorationLine: 'line-through',
        alignSelf: 'center'
    },
    box_btn: {
        flex: 1,
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'column-reverse',

    },
    box_sub_btn: {
        flex: 0.4,
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'column-reverse'
    },
    box_sub_resumen_main: {
        flex: 0.7,
        flexDirection: 'column',
    },
    box_sub_resumen: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: 5,
        flex: 0.3

    },

});