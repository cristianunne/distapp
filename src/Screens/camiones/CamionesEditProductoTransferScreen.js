import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text, TextInput, Alert } from 'react-native'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CustomButton from '../../components/CustomButton'
import MyButton from '../../components/MyButton'
import { TYPES_BTN } from '../../styles/common_styles'
import { LoadingModal } from "react-native-loading-modal";
import { updateCantidadEmpleadosComprasStock } from '../../databases/Entity/ComprasEntity'
import { showMessage, hideMessage } from "react-native-flash-message";
import { acceptTransferCamionFetch } from '../../services/fetching'



const CamionesEditProductoTransferScreen = ({ route, navigation }) => {

    const [isLoading, setIsLoading] = useState(false);

    const [icon, setIcon] = useState();

    const prod_compra = route.params.producto_tranfer.producto;
    const prod_transfer = route.params.producto_tranfer;
    const [cantidad, setCantidad] = useState();

    const onChangeText = (text) => {

        setCantidad(text);
        //console.log(cantidad);
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

                    let idtransferencia_stock = prod_transfer.idtransferencia_stock;
                    let idstock_campaign_producto = prod_transfer.idstock_campaign_producto;
                   
                    let idcamion = prod_transfer.camion_destino;
                    let idcampaign = prod_transfer.idcampaign;
                    let productos_idproductos = prod_transfer.productos_idproductos;

                    setIsLoading(true);
                    const resul = await acceptTransferCamionFetch(idtransferencia_stock, idstock_campaign_producto, cantidad, idcamion, idcampaign, productos_idproductos)
                   

                    setTimeout(() => {

                        if (resul) {

                            navigation.navigate('CamionesTransferenciasAceptarScreen', {
                                idcamion: idcamion,
                                idcampaign : idcampaign
                            });
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




    useEffect(() => {

        setIcon('data:image/png;base64,' + route.params.producto_tranfer.producto.image);
        //console.log(route.params.producto_tranfer.producto);

    });


    return (
        <View style={styles.container}>
            <Header title={'Editar Transferencia'} leftIcon={require('../../images/home.png')}
                rightIcon={require('../../images/cart.png')}></Header>

            <LoadingModal modalVisible={isLoading} color={'#00ff00'} title={'Cargando....'} />

            <View style={styles.box_main}>
                {/* pon aquí el texto que quieras */}
                <View style={styles.box_icon}>
                    <Image source={{ uri: icon }} style={styles.icon} />
                </View>

                <View style={styles.box_text_content}>
                    <Text style={styles.text_header}>{prod_compra.name + ' (' + prod_compra.marca + ' - ' +
                        prod_compra.content + ' ' + prod_compra.unidad + ')'}</Text>

                    <Text>
                        {'Cantidad Transferida: ' + prod_transfer.cantidad}
                    </Text>

                  

                </View>

                <View style={styles.box_input}>
                    <Text style={styles.label}>Cantidad: </Text>
                <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={cantidad}
                        placeholder="Ingrese la cantidad recibida"
                        keyboardType="numeric"
                    />

                </View>
                <View style={styles.box_btn}>
                    <MyButton text={'Aceptar'} type={TYPES_BTN.PRIMARY} onPress={acceptTransfer}></MyButton>
                </View>
                
            </View>



        </View>
    )
}

export default CamionesEditProductoTransferScreen

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