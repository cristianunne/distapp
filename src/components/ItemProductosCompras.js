import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ButtonIcon from './ButtonIcon';
import { COLORS, TYPES_BTN } from '../styles/common_styles';
import { AppContext } from '../Context/ContextApp';
import { setComprasEmpleado } from '../services/fetching';
import { updateEstadoEmpleadosComprasStock } from '../databases/Entity/ComprasEntity';
import { useIsFocused } from '@react-navigation/native';
import { showMessage, hideMessage } from "react-native-flash-message";



const ItemProductosCompras = ({ number_compra, prod_compra, setIsLoading, reload, setReload, reload2, setReload2 }) => {

    const [isLogin, setIsLogin, user, setUser] = useContext(AppContext);
    const isFocused = useIsFocused();

    const [isOnPress, setIsOnPress] = useState(false);
    const [fechaInicio, setFechaInicio] = useState();
    const [estado, setEstado] = useState();

    const [nameProduct, setNameProduct] = useState();
    const [name, setName] = useState('S/N');
    const [marca, setMarca] = useState('S/N');
    const [icon, setIcon] = useState();


    const [canEdit, setCanEdit] = useState(true)

    const navigation = useNavigation();

    const [user_, setUser_] = useState();
    const [estadoItem, setEstadoItem] = useState();






    useEffect(() => {

        if (prod_compra.name != '') {
            setName(prod_compra.name);
        }

        if (prod_compra.marca != '') {
            setMarca(prod_compra.marca);
        }

        setNameProduct(name + " (" + marca + ")" + " - " + prod_compra.content + " (" + prod_compra.unidad + ")");
        setIcon('data:image/png;base64,' + prod_compra.image);
       
        let sts = prod_compra.status == 0 ? 'Pedido' : prod_compra.status == 1 ? 'Comprado' : 
        prod_compra.status == 2 ? 'Enviado' : null;
        setEstado(sts);

        //console.log(sts);

        setEstadoItem(prod_compra.status);

        if(prod_compra.status == 0 || prod_compra.status == 1){
            setCanEdit(true);
        } else {
            setCanEdit(false);
        }
        setUser_(JSON.parse(user));
     


    }, [reload]);


    const onPress = () => {

        
        navigation.navigate('ProductosDetailssScreen',
        {
            prod_compra,
            number_compra : number_compra

        });
        setReload(!reload);
       
       
    }

    const onPressIn = () => {

        setIsOnPress(true);
    }

    const onPressOut = () => {

        setIsOnPress(false);
    }

    const onPressSendProductoCompra = async () => {
        setIsLoading(true);
  
        const data = {
            idcomprasstock : prod_compra.comprasstock_idcomprasstock,
            idproductos : prod_compra.idproductos,
            cantidad : prod_compra.cantidad_comprada,
            idusers : user_.idusers
        }



        const res = setComprasEmpleado(data);

        if(res){
            //seteo la el estado del producto
            const res_status = await updateEstadoEmpleadosComprasStock(prod_compra.empleado_comprastock_id, 2);
            setReload2(!reload2);

        }


        setTimeout(()=> {
            setIsLoading(false);
            showMessage({
                message: "El Producto se envio con éxito!",
                type: "success",
                icon: "success"
            });
        }, 3000);

       
        if(reload){
            setReload(false);
        } else {
            setReload(true);
        }    
        
    }


    return (

        <View style={[styles.container, styles.elevation]}>
            <View style={[styles.sub_container, isOnPress ? styles.backgroundcolorPress : styles.backgroundcolor]}>
                <View style={styles.box_icon}>
                    <Image source={{uri:icon}} style={styles.icon} />
                </View>
                <View style={styles.box_text_content}>
                    <View style={styles.box_text_sub_content}>
                        <Text style={styles.text_campaign}>Compra N°: </Text>
                        <Text style={styles.text_details}>{number_compra != undefined ? (number_compra) : null}</Text>
                    </View>
                    <View style={styles.box_text_sub_content}>
                        <Text style={styles.text_campaign}>Producto: </Text>
                        <Text style={styles.text_details}>{nameProduct}</Text>
                    </View>
                    <View style={styles.box_text_sub_content}>
                        <Text style={styles.text_campaign}>Cantidad Solicitada: </Text>
                        <Text style={styles.text_details}>{prod_compra.cantidad}</Text>
                    </View>

                    <View style={styles.box_text_sub_content}>
                        <Text style={styles.text_campaign}>Cantidad Comprada: </Text>
                        <Text style={styles.text_details}>{prod_compra.cantidad_comprada}</Text>
                    </View>

                    <View style={styles.box_text_sub_content}>
                        <Text style={styles.text_estado}>Estado: </Text>
                        <Text style={  prod_compra.status == 0 ? styles.text_details_estado_pedido :  
                         prod_compra.status == 1 ? styles.text_details_estado_comprado : 
                         prod_compra.status == 2 ? styles.text_details_estado_enviado : null}>
                            
                            {estado != undefined ? (estado) : null}</Text>
                    </View>


                </View>

                <View style={styles.btn_container}>
                {canEdit ?  
                    <View style={styles.box_btn}>
                        <ButtonIcon type={TYPES_BTN.SUCCESS} icon={'edit'} onPress={onPress} size_={24}></ButtonIcon>
                    </View> : <View style={styles.box_btn}></View>}
                  
                  {prod_compra.status == 1 ? 
                    <View style={styles.box_btn}>
                        <ButtonIcon type={TYPES_BTN.PRIMARY} icon={'file-upload'} size_={24} onPress={onPressSendProductoCompra}></ButtonIcon>
                    </View>  : <View style={styles.box_btn}></View>}
                   
                </View>
            </View>

        </View>


    )
}

export default ItemProductosCompras

const styles = StyleSheet.create({

    container: {
        height: 120,
        marginTop: 10,
        padding: 2,

    },
    elevation: {
        shadowColor: '#164620',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 5 },
        elevation: 4,
        shadowRadius: 1,
    },
    sub_container: {
        flexDirection: 'row',
        flex: 1,
        borderBottomColor: '#ededed',
        borderTopColor: '#ededed',
        borderLeftColor: '#ededed',
        borderRightColor: '#ededed',
        borderBottomWidth: 1.2,
        borderTopWidth: 1.2,
        borderLeftWidth: 1.2,
        borderRightWidth: 1.2,
        justifyContent: 'flex-start'
    },
    backgroundcolor: {
        backgroundColor: '#ffffff',
    },
    backgroundcolorPress: {
        backgroundColor: '#6ee7b7',
    },
    box_icon: {
        flex: 0.2,
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
        flex: 0.7,

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

    text_details_estado_pedido: {
        marginBottom: 5,
        fontFamily: 'serif',
        fontSize: 11,
        backgroundColor: COLORS.PRIMARY,
        padding: 3,
        color: '#ffffff'
    },

    text_details_estado_comprado: {
        marginBottom: 5,
        fontFamily: 'serif',
        fontSize: 11,
        backgroundColor: COLORS.WARNING,
        padding: 3,
        color: '#ffffff'
    },

    text_details_estado_enviado: {
        marginBottom: 5,
        fontFamily: 'serif',
        fontSize: 11,
        backgroundColor: COLORS.SUCCESS,
        padding: 3,
        color: '#ffffff'
    },

    btn_container : {
        flex: 0.17,
        flexDirection: 'column',
        padding: 0
        
        
    },
    box_btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
       

    },
    btn_icon: {
        width: 35,
        height: 35
    }



});