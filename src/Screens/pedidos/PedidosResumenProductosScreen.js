import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Alert, Image } from 'react-native'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { LoadingModal } from 'react-native-loading-modal'
import { showMessage, hideMessage } from "react-native-flash-message";
import { useNavigation } from '@react-navigation/native';
import { getProductosPedidosByIdFromDB } from '../../databases/Entity/PedidosEntity'
import { COLORS, TYPES_BTN } from '../../styles/common_styles'
import ButtonAction from '../../components/ButtonAction'
import { AppContext } from '../../Context/ContextApp'
import { getStockCampaignProductoAll } from '../../databases/Entity/StockCampaignProductoEntity'
import { insertProductIntoCartSession } from '../../databases/Entity/CartSessionEntity'

const PedidosResumenProductosScreen = ({ route }) => {

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


    const [isLogin, setIsLogin, user, setUser, campaignActive, setCampaignActive,  idcamion, setIdcamion, 
        clientePedido, setClientePedido, pedido, setPedido, isPedido, setIsPedido] = React.useContext(AppContext);

    const idpedido = route.params.idpedido;
    const idcliente = route.params.idcliente;
    const productos_ = route.params.productos;
    const navigation = useNavigation();
    const [productos, setProductos] = useState(null);
    const [stock, setStock] = useState(null);
    //console.log(productos);

    const [isLoading, setIsLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [items, setItems] = useState();
    const items_table = [];



    const getProductos = async () => {

        const prod_pedidos = await getProductosPedidosByIdFromDB(idpedido);
     

        return prod_pedidos;

    }

    const createItems = async () => {
        let i = 1;
        let productos_ = await getProductos();
        setProductos(productos_);

        //trigo la tabla stock completa, pero tengo que controlar que exista campaign y que exista el stock de los camiones
        //traigo tod en una consulta, si es 0 informo para que actualice
        const stock_producto = await getStockCampaignProductoAll();
        setStock(stock_producto);

        if(stock_producto.rows.length <= 0){

            showMessage({
                message: "Para ver los Productos del Pedido debe sincronizar el Stock del Camión!",
                type: "danger",
                icon: "danger",
                duration: 4000
            });

        } else {


            for (let i = 0; i < productos_.rows.length; i++) {
                let prod = productos_.rows.item(i);

                //verifico el stock del producto
                let stock = null;
                for (let j = 0; j < stock_producto.rows.length; j++) {

                    if(stock_producto.rows.item(j).productos_idproductos == prod.idproductos){
                        stock = stock_producto.rows.item(j);
                        break;
                    }
                  

                }
                
               
                let cantidad = stock == null ? null : stock.cantidad;
                let sub_item = [];

                let is_cantidad = stock == null ? true : stock.cantidad == 0 ? true : false;

             


    
                sub_item.push(<View style={styles.row} key={i}> 
                    <View style={styles.column_prod}>{ stock == null ? 
                     <Image source={require('../../images/borrar.png')} style={styles.errorIcon} />  :
                     stock.cantidad == 0 ?
                     <Image source={require('../../images/borrar.png')} style={styles.errorIcon} />  :
                    <Image source={require('../../images/check.png')} style={styles.checkIcon} /> 
                       
                    }</View>
                    <View style={styles.column_cantidad}><Text style={styles.text_row_head}>{prod.name + ' (' + prod.content + ' ' + prod.unidad + ')'}</Text></View>
                    <View style={styles.column_precio}><Text style={styles.text_row_head}>{prod.cantidad != null ? prod.cantidad : 0}</Text></View>
                    <View style={!is_cantidad ? styles.column_desc : styles.column_desc_error}>
                        <Text style={is_cantidad ? styles.text_row_head_error : styles.text_row_head}>{
                       stock == null ? '-----' : cantidad

                    }</Text></View>
                </View>
                );
    
                items_table.push(sub_item);
    
            }
    
            setItems(items_table);

            
        }


     


       


    }


    const venderPedido = async () => {

        //antes de vender verifico que la campaign este activa
        let is_goto = false;

        Alert.alert('Pedidos', '¿Desea Vender el Pedido?', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Aceptar', onPress: async () => {

                    if(campaignActive == null){

                        showMessage({
                            message: "Para realizar una Venta debe tener una Campaña activa!",
                            type: "danger",
                            icon: "danger"
                        });
            
                    } else {
            
                        setIsLoading(true);
            
                        if(productos != null){
                            if(stock != null){
            
                                for (let i = 0; i < productos.rows.length; i++) {
                                    let prod = productos.rows.item(i);
                    
                                    //verifico el stock del producto
                                    let stock_ = null;
                                    for (let j = 0; j < stock.rows.length; j++) {
                    
                                        if(stock.rows.item(j).productos_idproductos == prod.idproductos){
                                            stock_ = stock.rows.item(j);
                                            break;
                                        }
                                      
                                    }
            
                                    //si no existe el stock, no agrego
                                    //si el stock solicitado es mayor al disponible, agrego el disponiible
            
                                    if(stock_ != null){
            
                                        if(prod.cantidad > stock_.cantidad && stock_.cantidad  > 0){
            
                                            const res_save = await insertProductIntoCartSession(prod.idproductos, 
                                                stock_.cantidad, 
                                                prod.precio, prod.descuento);

                                            is_goto = true;
            
                                        } else if (prod.cantidad <= stock_.cantidad && stock_.cantidad  > 0){
            
                                            const res_save = await insertProductIntoCartSession(prod.idproductos, 
                                                prod.cantidad, 
                                                prod.precio, prod.descuento);
                                            is_goto = true;
                                        }
                                    }
            
                                }
            
                            }
            
                        }
            
                    }
                  
    
                    if(is_goto){

                        setClientePedido(idcliente);
                        setPedido(idpedido);
                        setIsPedido(true);
                        setIsLoading(false);
                        setReload(!reload);

                        setTimeout(() => {
    
                            navigation.navigate('CartSessionInicioScreen', {
                                idpedido : idpedido,
                                idcliente: idcliente
                            });
    
                            setIsLoading(false);
                            showMessage({
                                message: "El Pedido se ha cargado con éxito!",
                                type: "success",
                                icon: "success"
                            });
    
                        }, 1000)

                    } else {
                        setIsLoading(false);
                        showMessage({
                            message: "Para realizar una Venta deber agregarse productos al carrito!",
                            type: "danger",
                            icon: "danger"
                        });
                    }
                    


                }
            },
        ]);



     

      

    }


    useEffect(() => {


        createItems();



    }, [])


    return (
        <View style={styles.container}>
            <Header title={'Lista de Productos'} leftIcon={require('../../images/home.png')}
            />
            <LoadingModal modalVisible={isLoading} color={'#00ff00'} task={'Cargando....'} />

            <View style={[styles.box_welcome, styles.elevation]}>
                <View style={styles.box_hand}>
                    <Image source={require('../../images/info.png')} style={styles.bottomTabIcon} />
                </View>
                <View style={styles.box_saludo}>
                    <Text style={styles.title}>Importante</Text>
                    <Text style={styles.textuser}>{'Verifique la cantidad de productos solicitados y ' +
                        'la cantidad disponible en su Stock. Si el Stock no es suficiente se modificará la cantidad de productos Pedidos.'}</Text>
                </View>
            </View>


            <View style={styles.productos_container}>
                <View style={styles.productos_table_container}>
                    <ScrollView>
                        <View style={styles.table_head}>
                            <View style={styles.column_head_prod}><Text style={styles.text_column_head}>¿Stock?</Text></View>
                            <View style={styles.column_head_cantidad}><Text style={styles.text_column_head}>Producto</Text></View>
                            <View style={styles.column_head_precio}><Text style={styles.text_column_head}>Cantidad (Ped.)</Text></View>
                            <View style={styles.column_head_desc}><Text style={styles.text_column_head}>Disponible (Stock)</Text></View>

                        </View>

                        <View>

                            {items}
                        </View>



                    </ScrollView>

                </View>
            </View>

            <View style={styles.box_resumen}>
                <View style={styles.box_sub_resumen_main}>
                    <View style={styles.box_btn}>
                        <View style={styles.box_sub_btn}>
                            <ButtonAction title={'Vender'} type={TYPES_BTN.SUCCESS} onPress={venderPedido}></ButtonAction>


                        </View>

                    </View>

                </View>
            </View>

            <Footer></Footer>

        </View>
    )
}

export default PedidosResumenProductosScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed',

    },

    productos_container: {
        flex: 0.87,
        marginTop: 10,
        padding: 5
    },
    productos_table_container: {
        backgroundColor: '#ffffff',
        flex: 1,
        padding: 3,
        paddingTop: 15

    },

    table_head: {
        height: 29,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#dedede',
    },

    row: {
        height: 25,
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
        flex: 0.47
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
        flex: 0.1
    },
    column_head_precio: {

        borderColor: '#444444',
        borderWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.235
    },
    column_head_desc: {

        borderColor: '#444444',
        borderWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.235
    },



    column_cantidad: {

        borderColor: '#444444',
        borderWidth: 0.5,
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 0.461,
        paddingStart: 3
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
        flex: 0.1
    },
    column_precio: {

        borderColor: '#444444',
        borderWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.235
    },
    column_desc: {

        borderColor: '#444444',
        borderWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.235
    },

    column_desc_error: {

        borderColor: '#444444',
        borderWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.235,
        backgroundColor: '#f20000',
    },
    text_column_head: {
        fontSize: 10,
        fontWeight: 'bold'
    },

    text_row_head: {
        fontSize: 10
    },

    text_row_head_error: {
        fontSize: 10,
        color: '#ffffff'
    },

    box_welcome: {
        height: '15%',
        backgroundColor: COLORS.WARNING,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 7,
        marginTop: 17

    },

    box_hand: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    box_saludo: {
        flex: 2.2,
        alignItems: 'center',
        justifyContent: 'center',
    },


    title: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#164620',
        marginBottom: 7,
        alignSelf: 'center'
    },
    textuser: {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: '400',
        alignSelf: 'center',
        textAlign: 'justify'

    },
    elevation: {
        elevation: 7,
        shadowColor: '#164620',
    },
    bottomTabIcon: {
        width: 60,
        height: 60,
        tintColor: '#ffffff'

    },

    checkIcon: {
        width: 15,
        height: 15,
        tintColor: '#00ff00'

    },

    errorIcon: {
        width: 15,
        height: 15,

    },

    box_resumen: {
        flex: 0.13,
        backgroundColor: '#ffffff',
        marginBottom: 71,
        padding: 15,
        flexDirection: 'column'

    },

    box_sub_resumen_main: {
        flex: 1,
        flexDirection: 'row',
    },

    box_btn: {
        flex: 1,
        alignContent: 'flex-end',
        alignItems: 'flex-end',


    },
    box_sub_btn: {
        flex: 0.7,
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'column-reverse'
    },


});