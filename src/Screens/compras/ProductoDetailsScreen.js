import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text, TextInput } from 'react-native'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CustomButton from '../../components/CustomButton'
import MyButton from '../../components/MyButton'
import { TYPES_BTN } from '../../styles/common_styles'
import { LoadingModal } from "react-native-loading-modal";
import { updateCantidadEmpleadosComprasStock } from '../../databases/Entity/ComprasEntity'
import { showMessage, hideMessage } from "react-native-flash-message";



const ProductoDetailsScreen = ({ route, navigation }) => {


    const [icon, setIcon] = useState();

    const prod_compra = route.params.prod_compra;
    const number_compra = route.params.number_compra;
    const [isLoading, setIsLoading] = useState(false);

    const [empCompraStockId, setEmpCompraStockId] = useState();
    const [cantidad, setCantidad] = useState();

    const onChangeText = (text) => {

        setCantidad(text);
        //console.log(cantidad);
    }

    


    const updateCantidadPress = async () => {

        if(cantidad != undefined && empCompraStockId != undefined){

            //console.log('todo bien ' + empCompraStockId);
            setIsLoading(true);
            const resultado = await updateCantidadEmpleadosComprasStock(empCompraStockId, cantidad);

            setTimeout(()=> {
                setIsLoading(false);
                if(resultado != false){

                    showMessage({
                        message: "El Producto se edito con éxito!",
                        type: "success",
                        icon: "success"
                    });

                    navigation.navigate('ProductosComprasScreen', {
                        number_compra : number_compra
                    });
                }
            }, 3000)
            
          


        } else {
            console.log('todo mal');
        }


    }




    useEffect(() => {
        setIcon('data:image/png;base64,' + route.params.prod_compra.image);
        setEmpCompraStockId(route.params.prod_compra.empleado_comprastock_id);
        //console.log(route.params.prod_compra.empleado_comprastock_id);
        //console.log("empleado " + empCompraStockId);
    }, [cantidad, empCompraStockId]);

    //console.log(route.params.prod_compra);
    return (
        <View style={styles.container}>
            <Header title={'Detalle Compra'} leftIcon={require('../../images/home.png')}
                rightIcon={require('../../images/cart.png')}></Header>

            <LoadingModal modalVisible={isLoading} color={'#00ff00'} task={'Cargando....'}/>

            <View style={styles.box_main}>
                {/* pon aquí el texto que quieras */}
                <View style={styles.box_icon}>
                    <Image source={{ uri: icon }} style={styles.icon} />
                </View>

                <View style={styles.box_text_content}>
                    <Text style={styles.text_header}>{prod_compra.name + ' (' + prod_compra.marca + ' - ' +
                        prod_compra.content + ' ' + prod_compra.unidad + ')'}</Text>

                    <Text>
                        {'Cantidad Pedida: ' + prod_compra.cantidad}
                    </Text>

                  

                </View>

                <View style={styles.box_input}>
                    <Text style={styles.label}>Cantidad: </Text>
                <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={cantidad}
                        placeholder="Ingrese la cantidad comprada"
                        keyboardType="numeric"
                    />

                </View>
                <View style={styles.box_btn}>
                    <MyButton text={'Aceptar'} type={TYPES_BTN.SUCCESS} onPress={updateCantidadPress}></MyButton>
                </View>
                
            </View>


            <Footer />

        </View>
    )
}

export default ProductoDetailsScreen




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
        flex: 0.6,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 15,


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
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',

    },
    icon: {
        width: '30%',
        height: '100%'
    },

    box_input: {
        flex: 0.2,
        justifyContent: 'flex-start',
        flexDirection: 'row'

    },
    label: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center'

    },

    input: {
        flex: 1,
        height: 40,
        margin: 12,
        borderWidth: 0.5,
        padding: 10,
        alignSelf: 'center'
    },

    box_btn: {
        flex: 0.1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
   
});