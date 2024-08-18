import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, TextInput } from 'react-native'
import Header from '../../components/Header';
import NumericInput from 'react-native-numeric-input'
import ButtonEdit from '../../components/ButtonEdit';
import ButtonAction from '../../components/ButtonAction';
import { TYPES_BTN } from '../../styles/common_styles';
import { useNavigation } from '@react-navigation/native'
import { getCartSessionProductoById, updateProductIntoCartSession } from '../../databases/Entity/CartSessionEntity';
import { LoadingModal } from "react-native-loading-modal";


import { showMessage, hideMessage } from "react-native-flash-message";
import Footer from '../../components/Footer';
import { getStockCampaignProductoById } from '../../databases/Entity/StockCampaignProductoEntity';

const ProductoDetailsCartSessionScreen = ({ route }) => {

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const producto = route.params.producto;
    const [icon, setIcon] = useState();

    const [initial, setInitial] = useState(true);

    const [precio, setPrecio] = useState();
    const [descuento, setDescuento] = useState();
    const [cantidad, setCantidad] = useState();


    const [numberProductos, setNumberProductos] = useState(0);



    const onChangePrecio = (value) => {

        if (value == '' || value == null){
            setPrecio('0');
        } else {
            setPrecio(value);
        }
       
       
    }

    const onChangeDescuento = (value) => {

        if (value == '' || value == null){
            setDescuento('0');
        } else {
            setDescuento(value);
        }

      
    }

    

    const onChangeCantidad = (value) => {

        if (value == '' || value == null){
            setCantidad('0');
        } else {
            setCantidad(value);
        }

       
    }

    const onPressCancel = () => {
        navigation.goBack();
    }

    const onPressAcept = async () => {


        if (precio == '' || precio == null){

            showMessage({
                message: "El Precio debe ser mayor a 0",
                type: "danger",
                icon: "danger"
            });
            return;

        } else if (cantidad == '' || cantidad == null){


            showMessage({
                message: "La Cantidad debe ser mayor a 0",
                type: "danger",
                icon: "danger"
            });
            return;
          
        } else if (descuento == '' || descuento == null){


          setDescuento(0);
          
        }


        //traigo los datos y reviso que haya stock disponible
        const productos_cart = await getCartSessionProductoById(producto.idproductos);
        let suma = 0;
        let stock = 0;

        if (productos_cart != false){
            suma = productos_cart.rows.item(0).suma != null ?  Number(Number.parseFloat(productos_cart.rows.item(0).suma).toFixed(1)) : 0;

        }
       


        const stock_Ca = await getStockCampaignProductoById(producto.idstock_campaign_producto);
        if (stock_Ca != false){
            stock = stock_Ca.rows.item(0).cantidad != null ?  Number(Number.parseFloat(stock_Ca.rows.item(0).cantidad).toFixed(1)) : 0;

        }

        //console.log(stock);
        //console.log((suma - Number.parseFloat(cantidad)));
        //console.log(Number.parseFloat(cantidad));

        console.log(Number.parseFloat(cantidad));

        let stock_disp = stock - (suma - Number.parseFloat(producto.cart_s_cantidad));
        console.log(Number.parseFloat(stock_disp));


        if(Number.parseFloat(cantidad) > stock_disp){

            showMessage({
                message: "La Cantidad de productos supera el Stock Disponible",
                type: "danger",
                icon: "danger"
            });

        } else {  

            setIsLoading(true);
            //tomo los valores de los states y almaceno
            const res_update = await updateProductIntoCartSession(producto.id_cart_session, cantidad, precio, descuento);
            setTimeout(() => {
                setIsLoading(false);
                showMessage({
                    message: "El Producto se edito con éxito!",
                    type: "success",
                    icon: "success"
                });

                setTimeout(() => {
                    navigation.goBack();
                }, 1000)

            }, 1500)

                
        }
        
    }



    useEffect(() => {

        if (initial) {
            setIcon('data:image/*;base64,' + producto.image);
            let precio_ = producto.cart_s_precio != null ? producto.cart_s_precio.toString() : '0';
            setPrecio(precio_)

            let descuento_ = producto.cart_s_descuento != null ? producto.cart_s_descuento.toString() : '0';
            setDescuento(descuento_);

            let cantidad_ = producto.cart_s_cantidad;
            setCantidad(cantidad_.toString());
            //console.log('cantidad ' + cantidad_);
            setInitial(false);

            
        }


    }, [cantidad, precio, descuento])

    return (
        <View style={styles.container}>
            <Header title={'Editar Producto'} leftIcon={require('../../images/home.png')}
            />
            <LoadingModal modalVisible={isLoading} color={'#00ff00'} task={'Cargando....'} />
            <View style={styles.box_main}>
                <View style={styles.box_image}>
                    <View style={styles.box_icon}>
                        <Image source={{ uri: icon }} style={styles.icon} />
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.text_producto}>{producto.name + ' (' +
                            producto.marca + ')'}</Text>
                    </View>
                </View>

                <View style={styles.box_content}>
                    <View style={styles.box_input}>
                        <Text style={styles.label}>Precio: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangePrecio}
                            value={precio}
                            placeholder=""
                            keyboardType="numeric"
                        />

                    </View>

                    <View style={styles.box_input}>
                        <Text style={styles.label}>Descuento: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeDescuento}
                            value={descuento}
                            placeholder=""
                            keyboardType="numeric"
                        />

                    </View>

                    <View style={styles.counter_container}>
                        <Text style={styles.label}>Cantidad: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeCantidad}
                            value={cantidad}
                            placeholder=""
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.btn_container}>
                        <ButtonAction title={'Cancelar'} type={TYPES_BTN.DANGER} onPress={onPressCancel}></ButtonAction>
                        <ButtonAction title={'Aceptar'} type={TYPES_BTN.SUCCESS} onPress={onPressAcept}></ButtonAction>

                    </View>


                </View>

            </View>


            <Footer></Footer>

        </View>
    )
}

export default ProductoDetailsCartSessionScreen

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

    box_main: {
        flex: 0.4,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 15,
    },

    box_image: {
        flex: 0.32,
        borderRightWidth: 0.2,
        borderRightColor: '#888888',

    },

    box_content: {
        flex: 0.68,
        paddingLeft: 10
    },

    box_text_content: {
        flexDirection: 'column',
        fontFamily: 'Roboto',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 0.15,
        marginTop: 7,

    },

    text_header: {
        fontFamily: 'Roboto',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#030303',
        marginBottom: 7,
        alignSelf: 'center'
    },


    box_icon: {
        flex: 0.42,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    icon: {
        width: '70%',
        height: '100%'
    },

    box_input: {
        flex: 0.2,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: 20

    },
    label: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center'

    },

    input: {
        flex: 1,
        height: 35,
        margin: 12,
        borderWidth: 0.4,
        padding: 5,
        alignSelf: 'center',
        borderColor: '#888888'
    },

    box_btn: {
        flex: 0.1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },

    counter_container: {
        flexDirection: 'row',
        marginTop: 20,
        flex: 0.2,
        marginBottom: 15
    },

    btn_container: {

        flex: 0.4,
        marginTop: 10,
        flexDirection: 'row',
        alignContent: 'space-between',
        gap: 70,
        alignItems: 'flex-end'

    }, 
    description_container: {
        marginTop: 5
    },
    text_producto: {
        fontSize: 12,
        fontWeight: 'bold'

    },
});