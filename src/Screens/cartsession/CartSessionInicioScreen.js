import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, Text, Alert } from 'react-native'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { getCartSessionProductos } from '../../databases/Entity/CartSessionEntity'
import { useIsFocused } from '@react-navigation/native';
import { LoadingModal } from "react-native-loading-modal";
import FlashMessage from "react-native-flash-message";
import ItemProductosCart from '../../components/ItemProductosCart'
import ButtonAction from '../../components/ButtonAction'
import { TYPES_BTN } from '../../styles/common_styles'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../../Context/ContextApp'
import { delete_cart_session_table } from '../../databases/querysTables';
import * as SQLITE from 'expo-sqlite'
import { database_name, deleteTables } from '../../databases/databaseServices';
import { showMessage, hideMessage } from "react-native-flash-message";
import {Dimensions} from 'react-native';


const CartSessionInicioScreen = ({ route }) => {

    const [isLogin, setIsLogin, user, setUser, campaignActive, setCampaignActive,  idcamion, setIdcamion, 
        clientePedido, setClientePedido, pedido, setPedido, isPedido, setIsPedido] = React.useContext(AppContext);


    const { idpedido, idcliente } = route.params;



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

    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [result, setResult] = useState([]);
    const isFocused = useIsFocused();
    const result_ = [];
    const items_ = [];
    const [subTotal, setSubTotal] = useState();
    const [descuentos, setDescuentos] = useState();
    const [total, setTotal] = useState();
    const [prod, setProd] = useState();

    const [reload, setReload] = useState(false);

    const goToSelectCliente = () => {

        if(prod.length == 0){

            showMessage({
                message: "Para realizar una Venta debe agregar Productos.",
                type: "danger",
                icon: "danger"
            });

        } else {
            navigation.navigate('ClientesSelectionScreen', {
                productos: prod,
                sutotal: subTotal,
                descuento: descuentos,
                total: total,
                idcliente: idcliente
            });
        }
    }

    const cleanCart = async () => {

        Alert.alert('Vender', '¿Desea limpiar el Carrito?', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Aceptar', onPress: async () => {

                    //limpio el carrito
                    const db = SQLITE.openDatabase(database_name);
                    const clean_cart = await deleteTables(db, delete_cart_session_table);



                    if (clean_cart) {

                        showMessage({
                            message: "El Carrito se ha limpiado correctamente.",
                            type: "success",
                            icon: "success"
                        });
                        //limpio el context
                        setClientePedido(null);
                        setPedido(null);
                        setIsPedido(false);
                        setIsLoading(false);
                        setReload(!reload);

                    } else {

                        setIsLoading(false);
                        showMessage({
                            message: "No se ha podido limpiar el Carrito. Intente nuevamente!.",
                            type: "danger",
                            icon: "danger"
                        });

                    }

                }
            },
        ]);


    }


    const getProductos = async () => {
        setIsLoading(true);
        let subtotal_ = 0;
        let descuentos_ = 0;

        const productos = await getCartSessionProductos();
        //console.log(productos);

        for (let i = 0; i < productos.rows.length; i++) {
            let producto = productos.rows.item(i);
            items_.push(producto);

            result_.push(<ItemProductosCart key={i} producto={producto} 
                setIsLoading={setIsLoading} reload={reload} setReload={setReload} />);

            subtotal_ = subtotal_ + (producto.cart_s_precio * producto.cart_s_cantidad);
            let des = producto.cart_s_descuento != null ? producto.cart_s_descuento : 0;
            descuentos_ = descuentos_ + (des * producto.cart_s_cantidad);

        }
        setProd(items_);

        setSubTotal(subtotal_);
        setDescuentos(descuentos_);

        setTotal(subtotal_ - descuentos_);

        //console.log(productos);
        setResult(result_);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000)

    }

    const messageError = () => {

        Alert.alert('Error', 'Debe tener Campañas Activas', [
            {
                text: 'Aceptar', onPress: async () => {
                    navigation.navigate('Home');

                }
            },
        ]);

    }

    useEffect(() => {
        if (campaignActive != null) {
            getProductos();
        }

        console.log(windowHeight);


    }, [isFocused, reload])



    return (

        <View style={styles.container}>
            <Header title={'Productos'} leftIcon={require('../../images/home.png')}
                rightIcon={require('../../images/cart.png')}
            />

            <LoadingModal modalVisible={isLoading} color={'#00ff00'} task={'Cargando....'} />

            {campaignActive == null ? messageError() : null}

            {campaignActive == null ? null :
                <View style={styles.box_main}>
                    <SafeAreaView style={styles.box_content}>
                        <ScrollView style={styles.scrollview}>
                            <View style={styles.item_box}>
                                {result}
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </View>}
            {campaignActive == null ? null :
                <View style={styles.box_resumen}>
                    <View style={styles.box_sub_resumen_main}>
                        <View style={styles.box_sub_resumen}>
                        
                            <Text style={windowHeight > 690 ? styles.label : styles.label_min}>Subtotal: </Text>
                            <Text style={windowHeight > 690 ? styles.prices_text_value : styles.prices_text_value_min}>
                         
                                $
                                {subTotal != null ?
                                    subTotal.format(2, 3, '.', ',') : 0}
                            </Text>
                        </View>
                        <View style={styles.box_sub_resumen}>
                          
                            <Text style={windowHeight > 690 ? styles.label : styles.label_min}>Descuentos: </Text>
                            <Text style={windowHeight > 690 ? styles.descuento_text_value : styles.descuento_text_value_min}>
                         
        
                                $
                                {descuentos != null ?
                                    descuentos.format(2, 3, '.', ',') : 0}
                            </Text>

                        </View>
                        <View style={styles.box_sub_resumen}>
                            <Text style={windowHeight > 690 ? styles.label_total : styles.label_total_min}>Total: </Text>
                            <Text style={windowHeight > 690 ? styles.label_total : styles.label_total_min}>
                                $
                                {total != null ?
                                    total.format(2, 3, '.', ',') : 0}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.box_sub_resumen_main}>
                        <View style={styles.box_btn}>
                            <View style={styles.box_sub_btn}>
                                <ButtonAction title={'Vender'} type={TYPES_BTN.SUCCESS} onPress={goToSelectCliente}></ButtonAction>
                            </View>

                            <View style={styles.box_sub_btn}>
                                <ButtonAction title={'Limpiar Carrito'} type={TYPES_BTN.DANGER} onPress={cleanCart}></ButtonAction>
                            </View>

                        </View>

                    </View>
                </View>}

            <FlashMessage position="bottom" />

            <Footer></Footer>

        </View>
    )
}

export default CartSessionInicioScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed',
    },

    text_title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingLeft: 12,
        color: '#187351'
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

    box_main: {
        flex: 1,
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 1,
        paddingBottom: 1,

    },
    box_content: {
        flex: 1,

    },
    item_box: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 5,
        columnGap: 5,
        marginBottom: 30
    },
    scrollview: {
        padding: 5,

    },
    box_sub_resumen: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: 5,
        flex: 0.5

    },
    label: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center',
        fontSize: 18

    },

    label_min: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center',
        fontSize: 15

    },

    label_total: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#555555'

    },
    label_total_min: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555555'

    },
    prices_text_value: {
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#339944'
    },
    prices_text_value_min: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#339944'
    },
    descuento_text_value: {
        fontSize: 18,
        color: '#FF0000',
        textDecorationLine: 'line-through'
    },
    descuento_text_value_min: {
        fontSize: 16,
        color: '#FF0000',
        textDecorationLine: 'line-through'
    },
    box_btn: {
        flex: 1,
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'column-reverse',

    },
    box_sub_btn: {
        flex: 0.5,
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'column-reverse'
    }
});