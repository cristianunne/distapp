import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Text, ScrollView, Alert, Button, Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { MaterialIcons } from '@expo/vector-icons';
import Footer from '../../components/Footer';
import ButtonAction from '../../components/ButtonAction';
import { TYPES_BTN } from '../../styles/common_styles';
import { AppContext } from '../../Context/ContextApp';
import { showMessage, hideMessage } from "react-native-flash-message";
import { LoadingModal } from "react-native-loading-modal";
import { getProductosVentasById } from '../../databases/Entity/ProductosVentasEntity';
import URLS from '../../services/urls';




const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return <Button title={children} onPress={handlePress} />;


};


const VentasResumenScreen = ({ route }) => {

    const { venta } = route.params;
    console.log(venta);

    const print_url = URLS.PRINT_URL + venta.ventas_idventas;

    const [isLogin, setIsLogin, user, setUser, campaignActive, setCampaignActive, clientePedido, setClientePedido, pedido, 
        setPedido, isPedido, setIsPedido] = React.useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState();
    const items_table = [];

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

    const createItems = async () => {

        //tengo que traer los productos uniendo las tablas

        const prod_ventas = await getProductosVentasById(venta.ventas_id);

        //console.log(prod_ventas);

        let productos = [];
        for (let j = 0; j < prod_ventas.rows.length; j++) {

            productos.push(prod_ventas.rows.item(j));

        }


        let i = 1;
        for (item of productos) {
            let sub_item = [];

            let total = (item.cantidad * item.precio_unidad) - (item.cantidad * item.descuento_unidad);
            //console.log(item.cantidad);
            sub_item.push(<View style={styles.row} key={i}>
                <View style={styles.column_prod}><Text style={styles.text_row_head}>{item.name + ' (' + item.content + ' ' + item.unidad + ')'}</Text></View>
                <View style={styles.column_cantidad}><Text style={styles.text_row_head}>{item.cantidad}</Text></View>
                <View style={styles.column_precio}><Text style={styles.text_row_head}>{item.precio_unidad != null ? item.precio_unidad.format(2, 3, '.', ',') : 0}</Text></View>
                <View style={styles.column_desc}><Text style={styles.text_row_head}>{item.descuento_unidad != null ? item.descuento_unidad.format(2, 3, '.', ',') : 0}</Text></View>
                <View style={styles.column_tot}><Text style={styles.text_row_head}>{total != null ? total.format(2, 3, '.', ',') : 0}</Text></View></View>

            );
            i++;

            items_table.push(sub_item);


        }

        setItems(items_table);
        //console.log(productos);

    }



    useEffect(() => {
        createItems();


    }, [])








    return (
        <View style={styles.container}>
            <Header title={'Resumen de Venta'} leftIcon={require('../../images/home.png')}
            />
            <LoadingModal modalVisible={isLoading} color={'#00ff00'} title={'Cargando....'} />
            {venta.status == 1 ? 
                <View style={styles.print_container}>
                    <OpenURLButton url={print_url}>Imprimir</OpenURLButton>
                </View> : null }
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
                            <Text style={styles.text_item}>{venta.apellido}</Text>
                        </View>

                        <View style={styles.text_sub_content}>
                            <Text style={styles.label_cliente}>Nombre: </Text>
                            <Text style={styles.text_item}>{venta.nombre}</Text>
                        </View>

                        <View style={styles.text_sub_content}>
                            <Text style={styles.label_cliente}>Comercio: </Text>
                            <Text style={styles.text_item}>{venta.shop_name}</Text>
                        </View>

                        <View style={styles.text_sub_content}>
                            <Text style={styles.label_cliente}>Dirección: </Text>
                            <Text style={styles.text_item}>{venta.direccion + ' ' + venta.altura}</Text>
                        </View>

                        <View style={styles.text_sub_content}>
                            <Text style={styles.label_cliente}>Telefono: </Text>
                            <Text style={styles.text_item}>{venta.telefono}</Text>
                        </View>

                        <View style={styles.text_sub_content}>
                            <Text style={styles.label_cliente}>Localidad: </Text>
                            <Text style={styles.text_item}>{venta.localidad}</Text>
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
                            {venta.subtotal != null ?
                                venta.subtotal.format(2, 3, '.', ',') : 0}
                        </Text>
                    </View>
                    <View style={styles.box_sub_resumen}>
                        <Text style={styles.label}>Descuentos: </Text>
                        <Text style={styles.descuento_text_value}>
                            $
                            {venta.descuentos != null ?
                                venta.descuentos.format(2, 3, '.', ',') : 0}
                        </Text>

                    </View>

                    <View style={styles.box_sub_resumen}>
                        <Text style={styles.label}>Otros Descuentos: </Text>
                        <Text style={styles.descuento_text_value}>
                            $
                            {venta.descuento_geneneral != null ?
                                venta.descuento_geneneral.format(2, 3, '.', ',') : 0}
                        </Text>

                    </View>
                    <View style={styles.box_sub_resumen}>
                        <Text style={styles.label_total}>Total: </Text>
                        <Text style={styles.label_total}>
                            $
                            {venta.total != null ?
                                venta.total.format(2, 3, '.', ',') : 0}
                        </Text>
                    </View>


                </View>

            </View>


            <Footer></Footer>

        </View>
    )
}

export default VentasResumenScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed',

    },
    print_container: {
        marginTop: 5,

    },
    btn_print: {

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